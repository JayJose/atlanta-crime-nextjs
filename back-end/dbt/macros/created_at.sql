{% macro created_at() %}
    timezone('utc', now()) as created_at
{% endmacro %}