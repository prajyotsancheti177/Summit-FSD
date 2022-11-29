const express = require("express");
const router = new express.Router();
const connection = require("../db/connection");

//Adding Volunteer
router.post("/createVolunteer", (req, res) => {
  // console.log(req.body);
  const { name, branch, city, email, department } = req.body;
  if (!name || !branch || !city) {
    res.status(422).json("plz fill all data");
  }
  try {
    connection.query(
      "INSERT INTO Volunteer SET ?",
      { name, branch, city, email, department },
      (err, result) => {
        if (err) {
          console.log("err" + err);
        } else {
          res.status(201).json(req.body);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//Adding Department
router.post("/createDepartment", (req, res) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res.status(422).json("plz fill all data");
  }
  try {
    connection.query(
      "INSERT INTO Department SET ?",
      { name, budget },
      (err, result) => {
        if (err) {
          console.log("err" + err);
        } else {
          res.status(201).json(req.body);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//Adding Event
router.post("/createEvent", (req, res) => {
  // console.log(req.body);
  const {
    name,
    date,
    venue,
    minSquadSize,
    maxSquadSize,
    event_desc,
    img,
    type,
  } = req.body;
  if (
    !name ||
    !date ||
    !venue ||
    !minSquadSize ||
    !maxSquadSize ||
    !event_desc ||
    !img ||
    !type
  ) {
    res.status(422).json("plz fill all data");
  }
  try {
    connection.query(
      "INSERT INTO Events SET ?",
      { name, date, venue, minSquadSize, maxSquadSize, event_desc, img, type },
      (err, result) => {
        if (err) {
          console.log("err" + err);
        } else {
          res.status(201).json(req.body);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//Adding Player
router.post("/addPlayer", (req, res) => {
  // console.log(req.body);
  const { name, plays, phone, clg_Name, age, team } = req.body;
  if (!name || !plays || !phone || !clg_Name || !age || !team) {
    res.status(422).json("plz fill all data");
  }
  try {
    connection.query(
      "INSERT INTO Player SET ?",
      { name, plays, phone, clg_Name, age, team },
      (err, result) => {
        if (err) {
          console.log("err" + err);
        } else {
          res.status(201).json(req.body);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//get Competition data
router.get("/getCompetition", (req, res) => {
  connection.query("SELECT * FROM Events", (err, result) => {
    if (err) {
      res.status(422).json("no data available");
      console.log(err);
    } else {
      res.status(201).json(result);
    }
  });
});

router.get("/getCompetitionIndividual", (req, res) => {
  connection.query(
    "SELECT * FROM Events WHERE type=?",
    "individual",
    (err, result) => {
      if (err) {
        res.status(422).json("no data available");
        console.log(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

router.get("/getCompetitionTeam", (req, res) => {
  connection.query(
    "SELECT * FROM Events WHERE type=?",
    "team",
    (err, result) => {
      if (err) {
        res.status(422).json("no data available");
        console.log(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

//get Department data
router.get("/getDepartment", (req, res) => {
  connection.query("SELECT * FROM Department", (err, result) => {
    if (err) {
      res.status(422).json("no data available");
    } else {
      res.status(201).json(result);
    }
  });
});

//get Volunteer data
router.get("/getVolunteer", (req, res) => {
  connection.query("SELECT * FROM Volunteer", (err, result) => {
    if (err) {
      res.status(422).json("no data available");
    } else {
      res.status(201).json(result);
    }
  });
});

//get Player data
router.get("/getPlayer", (req, res) => {
  connection.query("SELECT * FROM Player", (err, result) => {
    if (err) {
      res.status(422).json("no data available");
    } else {
      res.status(201).json(result);
    }
  });
});

//Department Delete
router.delete("/deleteDepartment/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Department WHERE dept_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});

//Event Delete
router.delete("/deleteCompetition/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Events WHERE event_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});

//Volunteer Delete
router.delete("/deleteVolunteer/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Volunteer WHERE volunteer_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});

//Player Delete
router.delete("/deletePlayer/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Player WHERE player_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});

router.patch("/logOut", (req, res) => {
  connection.query(
    "UPDATE LoggedIN SET status = no  WHERE id = 1",
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "error" });
      } else {
        res.status(201).json(result);
      }
    }
  );
});
router.patch("/logIn", (req, res) => {
  connection.query(
    "UPDATE LoggedIN SET status = yes  WHERE id = 1",
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "error" });
      } else {
        res.status(201).json(result);
      }
    }
  );
});

router.get("/getStatus", (req, res) => {
  connection.query("SELECT * FROM LoggedIN WHERE id = 1", (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json(result);
    }
  });
});

//Get Individual Department
router.get("/getOneDepartment/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Department WHERE dept_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});
//Update Department
router.patch("/updateDepartment/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connection.query(
    "UPDATE Department SET ? WHERE dept_ID = ?",
    [data, id],
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "error" });
      } else {
        res.status(201).json(result);
      }
    }
  );
});

//Get Individual Volunteer
router.get("/getOneVolunteer/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Volunteer WHERE volunteer_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});
//Update Volunteer
router.patch("/updateVolunteer/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connection.query(
    "UPDATE Volunteer SET ? WHERE volunteer_ID = ?",
    [data, id],
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "error" });
      } else {
        res.status(201).json(result);
      }
    }
  );
});
//Get Player Data
router.get("/getPlayer", (req, res) => {
  connection.query("SELECT * FROM Player", (err, result) => {
    if (err) {
      res.status(422).json("error");
    } else {
      res.status(201).json(result);
    }
  });
});
//Get Player Competition
router.get("/getOnePlayer/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Player WHERE player_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});
//Update Competition
router.patch("/updatePlayer/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connection.query(
    "UPDATE Player SET ? WHERE player_ID = ?",
    [data, id],
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "error" });
      } else {
        res.status(201).json(result);
      }
    }
  );
});

router.get("/getOneCompetition/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Events WHERE event_ID = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(422).json("error");
      } else {
        res.status(201).json(result);
      }
    }
  );
});
//Update Competition
router.patch("/updateCompetition/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connection.query(
    "UPDATE Events SET ? WHERE event_ID = ?",
    [data, id],
    (err, result) => {
      if (err) {
        res.status(422).json({ message: "error" });
      } else {
        res.status(201).json(result);
      }
    }
  );
});

module.exports = router;
