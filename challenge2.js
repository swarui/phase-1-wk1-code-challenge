/**
 * Challenge 2: Speed Detector (Toy Problem)
 *
 * Here we need to write a program that takes as input the speed of a car
 * e.g 80. If the speed is less than 70, it should print `Ok`. Otherwise,
 * for every 5 km/s above the speed limit (70), it should give the driver
 * one demerit point and print the total number of demerit points.
 *
 * `For example, if the speed is 80, it should print: “Points: 2”. If the
 *  driver gets more than 12 points, the function should print: “License suspended”.`
 */

const speed_input_node = document.querySelector("#car-speed");
const check_speed_button_node = document.querySelector("#check-speed");
const speed_node = document.querySelector("#speed");

const update_html_element_text_content = (msg) => {
  // Change the content of this element based on the vaue
  // of the input element
  speed_node.textContent = msg;
};

const get_speed_value = () => {
  const speed_value = Number.parseInt(speed_input_node.value);
  if (isNaN(speed_value)) {
    update_html_element_text_content("Unkown");
  } else {
    return speed_value;
  }
};

/**
 * Determines the points from the value of speed
 * provided
 */
const determine_speed_handler = () => {
  const speed_value = get_speed_value();

  if (isNaN(speed_value)) {
    update_html_element_text_content("Unkown");
  } else {
    if (speed_value <= 70) {
      update_html_element_text_content("Ok");
    } else {
      const point_value = (speed_value - 70) / 5;
      if (point_value > 12) {
        update_html_element_text_content("License suspended");
      } else {
        update_html_element_text_content(`Points: ${point_value}`);
      }
    }
  }
};

check_speed_button_node.addEventListener("click", determine_speed_handler);