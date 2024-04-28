from django import template
import re

register = template.Library()

@register.filter(name='split_join')
def split_join(value, arg='-'):
    """Splits the string by spaces and replaces them with a single hyphen, avoiding consecutive hyphens."""
    # This regex replaces sequences of spaces with a single hyphen
    result = re.sub(r'\s+', arg, value)
    # This regex ensures that there are no consecutive hyphens
    result = re.sub(r'-+', arg, result)
    return result.lower()