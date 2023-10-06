/**
 * Challenge 3: Net Salary Calculator (Toy Problem)
 *
 * Write a program whose major task is to calculate an individual’s Net Salary by
 * getting the inputs of basic salary and benefits. Calculate the payee (i.e. Tax),
 * NHIFDeductions, NSSFDeductions, gross salary, and net salary.
 *
 * NB: Use KRA, NHIF, and NSSF values provided in the link below.
 * https://www.aren.co.ke/payroll/taxrates.htm
 * https://www.kra.go.ke/en/individual/calculate-tax/calculating-tax/paye
 */
const basic_salary_node = document.querySelector("#basic-salary");
const contribution_benefits_node = document.querySelector(
  "#contribution-benefits"
);
const personal_tax_relief_input_node = document.querySelector(
  "#personal-tax-relief"
);

const gross_salary_node = document.querySelector("#gross-salary");
const nhif_deduction_node = document.querySelector("#nhif-deduction");
const nssf_deduction_node = document.querySelector("#nssf-deduction");
const personal_tax_relief_node = document.querySelector(
  "#personal-tax-relief-out"
);
const net_salary_node = document.querySelector("#net-salary");
const paye_node = document.querySelector("#paye");
const tax_button_node = document.querySelector("#calcaculate-tax-button");

const set_element_text = (element, msg) => {
  span = element.querySelector("span");
  span.textContent = msg;
};

const formattedAmount = (amt) => amt.toLocaleString("en-US");

const get_personal_tax_relief = () =>
  Number.parseInt(personal_tax_relief_input_node.value);

const calculate_nhif_amount_from_gross_salary = (gross_salary) => {
  let nhif_amount;

  switch (true) {
    case gross_salary <= 5999:
      nhif_amount = 150;
      break;
    case gross_salary >= 6000 && gross_salary <= 7999:
      nhif_amount = 300;
      break;
    case gross_salary >= 8000 && gross_salary <= 11999:
      nhif_amount = 400;
      break;
    case gross_salary >= 12000 && gross_salary <= 14999:
      nhif_amount = 500;
      break;
    case gross_salary >= 15000 && gross_salary <= 19999:
      nhif_amount = 600;
      break;
    case gross_salary >= 20000 && gross_salary <= 24999:
      nhif_amount = 750;
      break;
    case gross_salary >= 25000 && gross_salary <= 29999:
      nhif_amount = 850;
      break;
    case gross_salary >= 30000 && gross_salary <= 34999:
      nhif_amount = 900;
      break;
    case gross_salary >= 35000 && gross_salary <= 39999:
      nhif_amount = 950;
      break;
    case gross_salary >= 40000 && gross_salary <= 44999:
      nhif_amount = 1000;
      break;
    case gross_salary >= 45000 && gross_salary <= 49999:
      nhif_amount = 1100;
      break;
    case gross_salary >= 50000 && gross_salary <= 59999:
      nhif_amount = 1200;
      break;
    case gross_salary >= 60000 && gross_salary <= 69999:
      nhif_amount = 1300;
      break;
    case gross_salary >= 70000 && gross_salary <= 79999:
      nhif_amount = 1400;
      break;
    case gross_salary >= 80000 && gross_salary <= 89999:
      nhif_amount = 1500;
      break;
    case gross_salary >= 90000 && gross_salary <= 99999:
      nhif_amount = 1600;
      break;
    default:
      nhif_amount = 1700;
      break;
  }
  return nhif_amount;
};

const calculate_nssf_from_gross_salary = (amount) => {
  const nssf_rate = 0.06;
  let nssf_charged_amount = 0;
  switch (true) {
    case amount <= 6000:
      nssf_charged_amount = amount * nssf_rate;
      break;
    case amount > 6000 && amount <= 18000:
      nssf_charged_amount = (amount - 6000) * nssf_rate + 360;
      break;
    default:
      nssf_charged_amount = 1080;
  }

  return nssf_charged_amount;
};

const calculate_deductions = (gross_salary_amt) => {
  // Do not use NHIF as insurable relief
  const nssf_amt = calculate_nssf_from_gross_salary(gross_salary_amt);
  return nssf_amt;
};

const calculate_gross_salary = () => {
  // adding basic salary and benefits allowances gives result to
  // goss salary
  const gross_salary_amt =
    Number.parseInt(basic_salary_node.value) +
    Number.parseInt(contribution_benefits_node.value);

  return gross_salary_amt;
};

const calculate_taxable_income = (gross_salary_amt, deduction_amt) => {
  // calculate taxable income
  const taxable_income_amt = gross_salary_amt - deduction_amt;
  return taxable_income_amt;
};

const calculate_paye = (taxable_income_amt) => {
  // claculate pay sa you an amount
  const tax_relief_amt = get_personal_tax_relief();

  let paye_amt;

  switch (true) {
    case taxable_income_amt <= 24000:
      paye_amt = taxable_income_amt * 0.1;
      break;
    case taxable_income_amt - 24000 <= 8333:
      paye_amt = 2400 + (taxable_income_amt - 24000) * 0.25;
      break;
    default:
      paye_amt = 2400.0 + 2083.25 + (taxable_income_amt - 32333) * 0.3;
      break;
  }

  paye_amt -= tax_relief_amt; // substract tax relief
  if (paye_amt <= 0) {
    return 0.0;
  } else {
    return paye_amt;
  }
};

const calculate_net_salary = (paye_amt) => {
  const gross_salary_amt = calculate_gross_salary();
  const nhif_amt = calculate_nhif_amount_from_gross_salary(gross_salary_amt);
  const nssf_amt = calculate_nssf_from_gross_salary(gross_salary_amt);

  const net_salary_amt = gross_salary_amt - (nhif_amt + nssf_amt + paye_amt);
  return net_salary_amt;
};

const calculate_all_amount_handler = () => {
  const gross_salary_amt = calculate_gross_salary();
  const nhif_amt = calculate_nhif_amount_from_gross_salary(gross_salary_amt);
  const nssf_amt = calculate_nssf_from_gross_salary(gross_salary_amt);
  const deduction_amt = calculate_deductions(gross_salary_amt);
  const taxable_income_amt = calculate_taxable_income(
    gross_salary_amt,
    deduction_amt
  );
  const paye_amt = calculate_paye(taxable_income_amt);
  const net_salary_amt = calculate_net_salary(paye_amt);

  set_element_text(gross_salary_node, formattedAmount(gross_salary_amt));
  set_element_text(nhif_deduction_node, formattedAmount(nhif_amt));
  set_element_text(nssf_deduction_node, formattedAmount(nssf_amt));
  set_element_text(paye_node, formattedAmount(paye_amt));
  set_element_text(net_salary_node, formattedAmount(net_salary_amt));
};

const init = () => {
  // initialize span nested in h1 because the amount is constant
  // and known
  set_element_text(personal_tax_relief_node, get_personal_tax_relief());
};

tax_button_node.addEventListener("click", calculate_all_amount_handler);

window.onload = init;