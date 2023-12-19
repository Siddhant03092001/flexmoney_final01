import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [first, firstchange] = useState("");
  const [last, lastchange] = useState("");
  const [age, agechange] = useState("");
  const [start, startchange] = useState("");
  const [batch, batchchange] = useState("");
  const [payment, paymentchange] = useState("");

  const navigate = useNavigate();
  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    

    if (first === null || first === "") {
      isproceed = false;
      errormessage += "First Name";
    }
    if (last === null || last === "") {
      isproceed = false;
      errormessage += "last Name";
    }
    else if (age<=18 || age>=65 ) {
      isproceed = false;
      errormessage += "Age and should be greater than 18 and less than 65 ";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    }

    return isproceed;
  };

  
  const handleSubmit = (e) => {
    
      e.preventDefault();
      if (IsValidate()) {
      let object = { first, last, age, start, batch, payment };
      // console.log(object);

      fetch("http://localhost:8000/User", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(object),
      })
        .then((res) => {
          // console.log(res);
          toast.success("Registered Successfully");
          navigate("/thanks");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed:" + err.message);
        });
    }
  };

  const handleOnlick1 = (e) => {
    e.preventDefault();
    toast.success("Pay succesfully");
  };


  return (
    <div className="offset-lg-3 col-lg-6">
      <form className="container" onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">
            <center>
              <h1>User Registeration</h1>
            </center>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    {" "}
                    First Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={first}
                    onChange={(e) => firstchange(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Last Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={last}
                    onChange={(e) => lastchange(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Age <span className="errmsg">*</span>
                  </label>
                  <input
                    value={age}
                    onChange={(e) => agechange(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Start Month<span className="errmsg">*</span>
                  </label>
                  <input
                    value={start}
                    onChange={(e) => startchange(e.target.value)}
                    type="month"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Batches<span className="errmsg">*</span>
                  </label>
                  <select
                    value={batch}
                    onChange={(e) => batchchange(e.target.value)}
                    className="form-control"
                  >
                    <option value="First(6-7AM)">First(6-7AM)</option>
                    <option value="Second(7-8AM)">Second(7-8AM)</option>
                    <option value="Third(8-9AM)">Third(8-9AM)</option>
                    <option value="Fourth(5-6PM)">Fourth(5-6PM)</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-8">
                <div>
                  <label>
                    Payment Option<span className="errmsg">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={payment}
                    onChange={(e) => paymentchange(e.target.value)}
                  >
                    <option value="UPI">UPI</option>
                    <option value="Cash">CASH</option>
                    <option value="Card">CARD</option>
                  </select>
                  <br />
                  <button
                    className="btn btn-success"
                    onClick={handleOnlick1}
                    value={payment}
                    onChange={(e) => paymentchange(e.target.value)}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <center>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </center>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
