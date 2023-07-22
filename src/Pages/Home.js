import React, { useEffect, useState } from "react";
import Profile from "../Components/Profile";
import Table from "../Components/Table";
import axios from "axios";

const Home = () => {
  const [expenseData, setExpenseData] = useState({
    _id: localStorage.getItem("user_id"),
    Date: "",
    Month: "",
    Year: "",
    category: "",
    expenseAmount: "",
  });

  const [editExpenseData, setEditExpenseData] = useState({
    _id: localStorage.getItem("user_id"),
    expense_id: "",
    Date: "",
    Month: "",
    Year: "",
    category: "",
    expenseAmount: "",
  });

  const [month, setMonth] = useState({
    monthSalary: "",
    Month: "",
    Year: "",
  });

  const[salDetail,setSalDetail] = useState({
     monthSalary : '',
     balance :''
  })
  const [edit, setEdit] = useState(false);
  const [boolMonth, setBoolMonth] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getexpenses", { withCredentials: true })
      .then((res) => {
        if (res.data.Success) {
          setAllExpenses(res.data.Data);
        } else {
          window.alert(res.data.Message);
        }
      })
      .catch((err) => {
        window.alert(err.response.data.Message);
      });

      axios.get('http://localhost:5000/getsalary',{withCredentials:true}).then((res)=>{
          
             if(res.data.Success){
                 
                salDetail.monthSalary = res.data.monthSalary;
                salDetail.monthSalary = res.data.balance;
                setSalDetail(salDetail);
             }else{

                 window.alert(res.data.Message);
             }
      }).catch((err)=>{
          window.alert(err.response.Message);
      })
  }, [editExpenseData]);

  const editData = (data) => {
    setEdit(true);
    console.log(data, editExpenseData);
    editExpenseData.expense_id = data.expense_id;
    editExpenseData.Date = data.date;
    editExpenseData.category = data.category;
    editExpenseData.expenseAmount = data.expenseAmount;
    setEditExpenseData(editExpenseData);
    console.log("final", editExpenseData);
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;

    setExpenseData({ ...expenseData, [name]: value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    console.log(expenseData);
    axios
      .post("http://localhost:5000/addexpenses", expenseData,{
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Success) {
          window.alert(res.data.Message);
          setEdit(false);
        } else {
          window.alert(res.data.Message);
        }
      })
      .catch((err) => {
        window.alert(err.response.data.Message);
      });

    setExpenseData({
      _id: localStorage.getItem("user_id"),
      Date: "",
      Month: "",
      Year: "",
      category: "",
      expenseAmount: "",
    });
  };

  const onHandleEditChange = (event) => {
    const { name, value } = event.target;
    setEditExpenseData({ ...editExpenseData, [name]: value });
  };

  const onHandleEditSubmit = (event) => {
    event.preventDefault();
    console.log(editExpenseData);
    axios
      .post("http://localhost:5000/editexpenses", editExpenseData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Success) {
          window.alert(res.data.Message);
        } else {
          window.alert(res.data.Message);
        }
      })
      .catch((err) => {
        window.alert(err.response.data.Message);
      });

    setEditExpenseData({
      _id: localStorage.getItem("user_id"),
      Date: "",
      Month: "",
      Year: "",
      category: "",
      expenseAmount: "",
    });
  };

  const onHandleMonthChange = (event) => {
    const { name, value } = event.target;
    setMonth({ ...month, [name]: value });
  };

  const onHandleMonthSubmit = (event) => {
    event.preventDefault();
    console.log(month);

    axios
      .post("http://localhost:5000/setmonth", month, { withCredentials: true })
      .then((res) => {
        if (res.data.Success) {
          window.alert(res.data.Message);
        } else {
          window.alert(res.data.Message);
        }
      })
      .catch((err) => {
        window.alert(err.response.data.Message);
      });

    setMonth({
      monthSalary: "",
      Month: "",
      Year: "",
    });
  };
  return (
    <div className="container-fluid" style={{ marginTop: "5%" }}>
      <div className="row">
        <div className="col-sm-1">
          <div
            style={{
              textAlign: "right",
              marginRight: "4%",
              marginBottom: "3%",
            }}
          >
            <button
              type="button"
              onClick={() => setBoolMonth(!boolMonth)}
              class="btn btn-primary btn-sm"
            >
              Set Month
            </button>
          </div>
          <Profile />
        </div>
        <div className="col-md-6 offset-md-2">
          <h3>Expense Details</h3>
          <Table data={allExpenses} editData={editData} />
          {edit && (
            <div id="formContent" style={{ marginTop: "6%" }}>
              <h3>Edit Expenses</h3>
              <div
                style={{
                  textAlign: "right",
                  marginRight: "4%",
                  marginBottom: "3%",
                }}
              >
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  class="btn btn-danger btn-sm"
                >
                  Close
                </button>
              </div>
              <form onSubmit={onHandleEditSubmit}>
                <input
                  type="text"
                  id="login"
                  className="fadeIn second"
                  name="category"
                  value={editExpenseData.category}
                  onChange={onHandleEditChange}
                  placeholder="Name of Expense"
                />
                <input
                  type="number"
                  id="date"
                  className="fadeIn third"
                  name="Date"
                  value={editExpenseData.Date}
                  onChange={onHandleEditChange}
                  placeholder="Date"
                />
                <input
                  type="number"
                  id="month"
                  className="fadeIn second"
                  name="Month"
                  value={editExpenseData.Month}
                  onChange={onHandleEditChange}
                  placeholder="Month"
                />
                <input
                  type="number"
                  id="year"
                  className="fadeIn second"
                  name="Year"
                  value={editExpenseData.Year}
                  onChange={onHandleEditChange}
                  placeholder="Year"
                />
                <input
                  type="number"
                  id="amount"
                  className="fadeIn second"
                  name="expenseAmount"
                  value={editExpenseData.expenseAmount}
                  onChange={onHandleEditChange}
                  placeholder="Expense Amount"
                />
                <input type="submit" className="fadeIn fourth" value="EDIT" />
              </form>
            </div>
          )}
        </div>
        <div className="col-sm" style={{ textAlign: "right" }}>
          <div id="formContent">
            <h3>Add Expenses</h3>
            <form onSubmit={onHandleSubmit}>
              <input
                type="text"
                id="login"
                className="fadeIn second"
                name="category"
                value={expenseData.category}
                onChange={onHandleChange}
                placeholder="Name of Expense"
              />
              <input
                type="number"
                id="date"
                className="fadeIn third"
                name="Date"
                value={expenseData.Date}
                onChange={onHandleEditChange}
                placeholder="Date"
              />
              <input
                type="number"
                id="month"
                className="fadeIn second"
                name="Month"
                value={expenseData.Month}
                onChange={onHandleEditChange}
                placeholder="Month"
              />
              <input
                type="number"
                id="year"
                className="fadeIn second"
                name="Year"
                value={expenseData.Year}
                onChange={onHandleEditChange}
                placeholder="Year"
              />
              <input
                type="number"
                id="amount"
                className="fadeIn second"
                name="expenseAmount"
                value={expenseData.expenseAmount}
                onChange={onHandleChange}
                placeholder="Expense Amount"
              />
              <input type="submit" className="fadeIn fourth" value="ADD" />
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        {boolMonth && (
          <div id="formContent">
            <h3>Set Month</h3>
            <form onSubmit={onHandleMonthSubmit}>
              <input
                type="number"
                id="salary"
                className="fadeIn second"
                name="monthSalary"
                value={month.monthSalary}
                onChange={onHandleMonthChange}
                placeholder="Monthly Salary"
              />
              <input
                type="number"
                id="amount"
                className="fadeIn second"
                name="Month"
                value={month.Month}
                onChange={onHandleMonthChange}
                placeholder="Set Month"
              />
              <input
                type="number"
                id="amount"
                className="fadeIn second"
                name="Year"
                value={month.Year}
                onChange={onHandleMonthChange}
                placeholder="Set Year"
              />
              <input type="submit" className="fadeIn fourth" value="ADD" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
