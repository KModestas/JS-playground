import { useEffect, useState, useRef } from "react";

const options = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const divEl = useRef();

  // [Problem]:
  // If wanted to close the dropdown by clicking outside of it, the only way to do this is to add a vanilla JS event listener on the body
  // ...However, after doing so, now the dropdown doesn't open:
  // - isOpen is initially false
  // - Select is clicked and sets it to true
  // - Event bubbles to Body and sets it to false again

  // [Solution]:
  // Add condition inside the Body event listener to never run it whenever we click the Dropdown itself
  // this will prevent it from being invoked whenever we directly click the Dropdown, therefore it will not override the value set by the Dropdown
  useEffect(() => {
    const handleClick = (e) => {
      // .contains() is a native DOM API method that checks whether a node is a descendant of another node.
      // this condition will run when a click happens OUTSIDE of the Dropdown since it doesn't contain the Body.
      const clickOutsideDropdown = !divEl.current.contains(e.target);

      if (clickOutsideDropdown) {
        console.log(`Body Clicked: set to ${false}`);
        setIsOpen(false);
      }
    };

    // NOTE: this code works but there is a quirk. When we click an Option Dropdown element, clickOutsideDropdown returns true.
    // This is due to a race condition:
    // - isOpen is true
    // - Option is clicked
    // - isOpen set to false and re-rendered (divEl is now a NEW element)
    // - Event bubbles up Body
    // - the NEW element DOESN'T contain the event, so condition is true and handler runs
    // Summary:
    // component re-renders faster than the event bubbles to the Body. To fix this, we can invoke Body listener during the Capture Phase. This means Body listener will run first and the condition will be evaluated before the re-render happens.
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    return (
      <div
        onClick={(e) => {
          // Another fix for the race condition above is to stop the event from bubbling up to the Body. However this is not recommended as it will stop every potential handlers in the chain.
          // e.stopPropagation();
          console.log(`Option Clicked: set to ${!isOpen}`);
          setIsOpen(!isOpen);
        }}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl}>
      {/* NOTE: Select and Option are siblings, so clicking Option will not bubble up to Select. */}
      <div
        onClick={(e) => {
          console.log(`Select Clicked: set to ${!isOpen}`);
          setIsOpen(!isOpen);
        }}
      >
        Select...
      </div>
      {isOpen && <div>{renderedOptions}</div>}
    </div>
  );
}

export default Dropdown;
