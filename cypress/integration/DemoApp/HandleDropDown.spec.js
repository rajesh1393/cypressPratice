describe("Handling dropdown", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });
  it("Handling Dynamic Dropdown", () => {
    var selectDropDown = "Cosmic";
    cy.url().should("include", "pages/dashboard");
    //Verify selected dropdown option
    cy.get("ngx-header button.select-button")
      .as("DropdownButton")
      .should("contain.text", "Light");
    cy.get("ngx-header button.select-button").click();
    //To do direct click
    cy.get("ul.option-list")
      .find("nb-option")
      .contains(selectDropDown)
      .click()
      .then(() => {
        cy.get("ngx-header button.select-button").should(
          "contain.text",
          selectDropDown
        );
      });
    //indirect way to verify the lists of dropdown
    cy.get("ngx-header button.select-button").click();
    cy.get("ul.option-list")
      .find("nb-option")
      .as("DropDownLists")
      .each(($el, index) => {
        const dropDownExpectedLists = ["Light", "Dark", "Cosmic", "Corporate"];
        cy.wrap($el).should("contain.text", dropDownExpectedLists[index]);
      });
    //Indirect way to click the expected elements
    cy.get("ul.option-list")
      .find("nb-option")
      .each(($el) => {
        var text = $el.text().trim();
        if (text == selectDropDown) {
          cy.wrap($el).click();
          cy.get("ngx-header button.select-button").should(
            "contain.text",
            selectDropDown
          );
        }
      });
    cy.get(".layout nb-layout-header").should(
      "have.css",
      "background-color",
      "rgb(50, 50, 89)"
    );
    //Verify all dropdownoptions and colors
    cy.get("ngx-header button.select-button").click();
    cy.get("ul.option-list")
      .find("nb-option")
      .then(($el) => {
        const dropDownExpectedListswithColours = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };
        for (let color in dropDownExpectedListswithColours) {
          cy.log(color);
          cy.log(dropDownExpectedListswithColours[color]);
          cy.wrap($el).contains(color).click();
          cy.get(".layout nb-layout-header").should(
            "have.css",
            "background-color",
            dropDownExpectedListswithColours[color]
          );
          if (!(color == "Corporate")) {
            cy.get("ngx-header button.select-button").click();
          }
        }
      });
    //Verify table menu click and navigation
    cy.get("[tag=menu-sidebar] nb-menu").as("MainMenu");
    cy.get("@MainMenu").contains("Tables & Data").click();
    cy.get("ul .menu-items.expanded a")
      .contains("Smart Table")
      .click()
      .get("nb-card nb-card-header")
      .should("contain.text", "Smart Table");
  });
});
