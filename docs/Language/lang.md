# AssistScript

The language that powers the Assistant is called AssistScript. It is a custom-built language that is designed to be easy to use and easy to learn.
AssistScript was specifically designed for the Assistant.

The language is an instruction based lang; every statement/unit is an instruction.
Every instruction takes in a set of arguments and returns a result, other instructions can tak in the result of the previous instruction as an argument.

eg:
`instruction arg1 arg2`<br/>
In code these instructions are termed as `commands`. From now on instructions and commands will be used interchangeably.

Each term/unit inside an instruction is separated by a space. The first term is the instruction name, and the rest are the arguments.

To use a command as an argument to another command use `()`.<br/>
eg: `command1 (command2 arg1 arg2) arg3`<br/>
eg: `command1 (command2 arg1 (command3 arg1 arg2)) arg3`

Each command has predefined functionality. And takes in a set of arguments and returns a result; that are governed by the implementation. 

## Command chaining

To execute command one after another, enclose each command with a `()` and separate than with spaces. This is called command chaining. 
eg: `(command1 arg1 arg2) (command2 arg1 arg2) (command3 arg1 arg2)`

## Supported commands

/// TODO

## Examples

A simple while loop that prints the value of i until it reaches 10

```assistScript
(set i 0)
(while (lt (get i) 10) (
    (p "Current i = " (get i)) 
    (set i (add (get i) 1))
))
```

The above code roughly translates to the following pseudocode

```AssistScript
while (i < 10) {
    print "current i = " + i
    i = i + 1
}
```
