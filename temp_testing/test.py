def split_string_to_array(s):
    stack = []
    result = []
    current = ""
    
    for char in s:
        if char == '(':
            if current:
                result.append(current)
            current = ""
            stack.append(result)
            result = []
        elif char == ')':
            if current:
                result.append(current)
            current = ""
            popped = stack.pop()
            popped.append(result)
            result = popped
        elif char == ' ':
            if current:
                result.append(current)
            current = ""
        else:
            current += char
    
    if current:
        result.append(current)
    
    return result

while True:
	input_string = input("Enter: ")
	result = split_string_to_array(input_string)
	print(result)
	if input("Continue(Y/N): ") in ('N', 'n'):
		break
