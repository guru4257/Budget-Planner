import React from "react";
import dayjs from 'dayjs';

const Table = (props) => {

  const data = props.data;  
  return (
    <div className="table-responsive">
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Category</th>
            <th scope="col">Expense Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {data.map((exp)=>{

            return(
                <tr>
                <td>{dayjs(exp.date).format("DD/MM/YYYY")}</td>
                <td>{exp.category}</td>
                <td>{exp.expenseAmount}</td>
                <td>
                <button type="button" onClick={()=>{props.editData(exp)}}  class="btn btn-primary btn-sm">
                  Edit
                </button>
                </td>
              </tr>
            )
          })}  
        </tbody>
      </table>
      </div>
   
  );
};


export default Table;