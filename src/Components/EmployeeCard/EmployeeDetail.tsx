import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useContext } from "react";
import { ThemeProviderContext } from "../../../components/theme-provider";
ModuleRegistry.registerModules([AllCommunityModule]);

interface Employee {
  name: string;
  email: string;
  phone?: string;
  role: "Developer" | "Designer" | "Manager";
  joiningDate: string;
}

interface EmployeeGridProps {
  employee: Employee[];
}

const EmployeeDetail = (props: EmployeeGridProps) => {
  const { employee } = props;
  const context = useContext(ThemeProviderContext);
  //console.log(employee);

  console.log("conntext", context);

  // console.log("clg local",localStorage.getItem("employee"))

  const columns: ColDef[] = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "Role", field: "role", sortable: true, filter: true },
    {
      headerName: "Joining Date",
      field: "joiningDate",
      sortable: true,
      filter: true,
    },
  ];
  return (
    <>
      <div
        className={
          context.theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
        }
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={employee}
          columnDefs={columns}
          pagination={true}
          className="w-full"
        />
      </div>
    </>
  );
};

export default EmployeeDetail;
