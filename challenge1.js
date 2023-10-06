/**
 * Challenge 1: Student Grade Generator (Toy Problem)
 *
 * In this challenge, we need to write a program that requests user to input
 * student marks. The input should be between 0 and 100. Then output the correct grade:
 * A > 79, B - 60 to 79, C - 59 to 49, D - 40 to 49, E - less 40.
 */

const mark_input_node = document.querySelector("#mark");
const check_grade_button_node = document.querySelector("#check-grade");
const grade_node = document.querySelector("#grade");

const get_mark = () => {
  const mark = Number.parseInt(mark_input_node.value);
  if (isNaN(mark)) {
    print_output("Unkown");
  } else {
    return mark;
  }
};


//   Evaluates a grade based on the provided mark
 
const determine_grade_handler = () => {
  const mark = get_mark();

  // validate the mark range
  if (mark >= 0 && mark <= 100) {
    if (mark > 79 && mark <= 100) {
      print_output("A");
    } else if (mark >= 60 && mark <= 79) {
      print_output("B");
    } else if (mark >= 49 && mark < 60) {
      print_output("C");
    } else if (mark >= 40 && mark < 49) {
      print_output("D");
    } else {
      print_output("E");
    }
  } else {
    print_output("Invalid Grade");
  }
};

const print_output = (msg) => {
  // Change the content of this element based on the value of the input element
  
  grade_node.textContent = msg;
};

check_grade_button_node.addEventListener("click", determine_grade_handler);