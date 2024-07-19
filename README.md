# Habit Tracker

## Supabase functions:

GET_STREAKS
```
CREATE OR REPLACE FUNCTION get_streaks()
RETURNS jsonb
AS $$
DECLARE
    result jsonb;
BEGIN
    result := jsonb_agg(
        (WITH ranked_progress AS (
            SELECT
                p.habit_id,
                p.date,
                ROW_NUMBER() OVER (PARTITION BY p.habit_id ORDER BY p.date) AS row_num
            FROM progress p
            JOIN habits h ON p.habit_id = h.id
            WHERE h.created_by = auth.uid()
        ),
        streaks AS (
            SELECT
                habit_id,
                date,
                row_num,
                date - (row_num * INTERVAL '1 day') AS streak_start
            FROM ranked_progress
        ),
        grouped_streaks AS (
            SELECT
                habit_id,
                MIN(date) AS streak_start,
                MAX(date) AS streak_end,
                COUNT(*) AS streak_length
            FROM streaks
            GROUP BY habit_id, streak_start
        )
        SELECT
            jsonb_build_object(
                'habit_id', habit_id,
                'current_streak', MAX(streak_length)
            )
        FROM grouped_streaks
        GROUP BY habit_id)
    );
    RETURN result;
END;
$$ LANGUAGE plpgsql;
```

```sql