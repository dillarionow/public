package grok_connect.table_query;

import grok_connect.utils.*;


public class FieldPredicate
{
    public String field;
    public String dataType;
    public String pattern;
    public PatternMatcher matcher;

    public FieldPredicate(String field, String pattern, String dataType) {
        this.field = field;
        this.pattern = pattern;
        this.dataType = dataType;
    }

    public String toString() {
        return field + " " + pattern;
    }
}
