$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  var actions =
    '<a class="save" title="save" data-toggle="tooltip"><i class="material-icons">&#xEF65;</i></a>' +
    '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
    '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';

  // Append table with add row form on add new button click
  $(".add-new").click(function () {
    $(this).attr("disabled", "disabled");
    var index = $("table tbody tr:last-child").index();
    var row =
      "<tr>" +
      '<td><input type="text" class="form-control" name="name" id="name"></td>' +
      '<td><input type="text" class="form-control" name="department" id="department"></td>' +
      '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
      "<td>" +
      actions +
      "</td>" +
      "</tr>";

    $("table").append(row);
    $("table tbody tr")
      .eq(index + 1)
      .find(".save, .edit")
      .toggle();
    $('[data-toggle="tooltip"]').tooltip();
  });

  // Add row on add button click
  $(document).on("click", ".save", function () {
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      addUser(input[0].value, input[1].value, input[2].value)
        .then((data) => {
          getUser();
        })
        .catch((error) => {
          alert("somthing wornt");
        });
    }
  });

  // update row click add button
  $(document).on("click", ".add", function () {
    var id = $(this).attr("id");
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      updateUser(id, input[0].value, input[1].value, input[2].value)
        .then((data) => {
          input.each(function () {
            $(this).parent("td").html($(this).val());
          });
          $(this).parents("tr").find(".add, .edit").toggle();
          $(".add-new").removeAttr("disabled");
        })
        .catch((error) => {
          alert("somthing wornt");
        });
    }
  });

  // Edit row on edit button click
  $(document).on("click", ".edit", function () {
    $(this)
      .parents("tr")
      .find("td:not(:last-child)")
      .each(function () {
        $(this).html(
          '<input type="text" class="form-control" value="' +
            $(this).text() +
            '">'
        );
      });
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  });

  // Delete row on delete button click
  $(document).on("click", ".delete", function () {
    var id = $(this).attr("id");
    deleteUser(id)
      .then((data) => {
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
      })
      .catch((error) => {
        alert("somthing wornt");
      });
  });

  // load user on load the page
  getUser();
});

//get data user function
function getUser() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/User/getUsers",
      async: true,
      success: function (data) {
        var tableContent = "";
        data.forEach(function (data) {
          console.log(data["name"]);
          tableContent +=
            "<tr>" +
            "<td>" +
            data["name"] +
            "</td>" +
            "<td>" +
            data["city"] +
            "</td>" +
            "<td>" +
            data["tel"] +
            "</td>" +
            "<td>" +
            '<a class="add" title="Add" id="' +
            data["id"] +
            '" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
            '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
            '<a class="delete" id="' +
            data["id"] +
            '" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
            "</td>" +
            "</tr>";
        });
        $("table tbody").html(tableContent);
      },
      error: function (xhr, exception) {
        alert("ERROR");
      },
    });
  });
}

//add new user function
function addUser(name, city, tel) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/User/saveUser",
      async: true,
      data: JSON.stringify({
        name: name,
        city: city,
        tel: tel,
      }),
      success: function (data) {
        resolve({ data: "success" });
      },
      error: function (xhr, exception) {
        reject({ error: "error" });
      },
    });
  });
}

//update user function
function updateUser(id, name, city, tel) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "PUT",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/User/updateUser",
      async: true,
      data: JSON.stringify({
        id: id,
        name: name,
        city: city,
        tel: tel,
      }),
      success: function (data) {
        resolve({ data: "success" });
      },
      error: function (xhr, exception) {
        reject({ error: "error" });
      },
    });
  });
}

//delete user function
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "DELETE",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/User/deletUser",
      async: true,
      data: JSON.stringify({
        id: id,
      }),
      success: function (data) {
        resolve({ data: "success" });
      },
      error: function (xhr, exception) {
        reject({ error: "error" });
      },
    });
  });
}