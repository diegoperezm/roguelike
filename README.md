- [Diagram](#org1733b3a)
- [Definitions](#org5ada5ff)
  - [State Diagram](#orgf5be7a9)
  - [Statechart](#orgd1f65dc)
  - [State](#org186fefc)
  - [Global variables](#org96615ab)
- [Setup](#org314b8f1)
  - [Dependencies](#org3457f87)
- [Demo](#orgd6674f4)



<a id="org1733b3a"></a>

# Diagram

![img](chart.png)


<a id="org5ada5ff"></a>

# Definitions


<a id="orgf5be7a9"></a>

## State Diagram

From [Wikipedia:](https://en.wikipedia.org/wiki/State_diagram)

> A state diagram is a type of diagram used in computer science and related fields to describe the behavior of systems. State diagrams require that the system described is composed of a finite number of states; sometimes, this is indeed the case, while at other times this is a reasonable abstraction. Many forms of state diagrams exist, which differ slightly and have different semantics.


<a id="orgd1f65dc"></a>

## Statechart

From [Wikipedia:](https://en.wikipedia.org/wiki/State_diagram#Harel_statechart)

> Classic state diagrams require the creation of distinct nodes for every valid combination of parameters that define the state. This can lead to a very large number of nodes and transitions between nodes for all but the simplest of systems (state and transition explosion). This complexity reduces the readability of the state diagram. With Harel statecharts it is possible to model multiple cross-functional state diagrams within the statechart. Each of these cross-functional state machines can transition internally without affecting the other state machines in the statechart. The current state of each cross-functional state machine in the statechart defines the state of the system. The Harel statechart is equivalent to a state diagram but it improves the readability of the resulting diagram.

-   [STATECHARTS: A VISUAL FORMALISM FOR COMPLEX SYSTEMS.pdf](http://www.inf.ed.ac.uk/teaching/courses/seoc/2005_2006/resources/statecharts.pdf)


<a id="org186fefc"></a>

## State

-   STATE

From [Wikipedia:](https://en.wikipedia.org/wiki/State_(computer_science))

> In information technology and computer science, a program is described as stateful if it is designed to remember preceding events or user interactions;[1] the remembered information is called the state of the system.


<a id="org96615ab"></a>

## Global variables

From [MDN documentation:](https://developer.mozilla.org/en-US/docs/Glossary/Global_variable)

> A global variable is a variable that is declared in the global scope in other words, a variable that is visible from all other scopes.
> 
> In JavaScript it is a property of the global object.

From [Wikipedia:](https://en.wikipedia.org/wiki/Global_variable)

> In computer programming, a global variable is a variable with global scope, meaning that it is visible (hence accessible) throughout the program, unless shadowed. The set of all global variables is known as the global environment or global state. In compiled languages, global variables are generally static variables, whose extent (lifetime) is the entire runtime of the program, though in interpreted languages (including command-line interpreters), global variables are generally dynamically allocated when declared, since they are not known ahead of time.


<a id="org314b8f1"></a>

# Setup


<a id="org3457f87"></a>

## Dependencies

-   Xstate

-   jsdom

-   sinon

-   tape


<a id="orgd6674f4"></a>

# Demo

[Live link](https://diegoperezm.github.io/roguelike/src/index.html)
