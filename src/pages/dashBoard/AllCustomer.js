import React, { useCallback, useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
// import { ProductService } from "./service/ProductService";
import { FilterMatchMode } from "primereact/api";
import { ToggleButton } from "primereact/togglebutton";
// import { ProductService } from './';
// import {axios}
import axios from "axios";
import { Calendar } from "primereact/calendar";
import { PageStyle } from "../../components/PageStyle";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import FileUploadButton from "../../components/FileUploadBtn";
export default function AllCustomer() {
  const [products, setProducts] = useState(null);
  //   drop down values
  const [selectedDate, setSelectedDate] = useState(null);
  const [statuses] = useState([true, false]);
  const [interestStatus] = useState(["auto", "tech", "energy"]);
  const [genderStatus] = useState(["male", "female", "other"]);
  const dt = useRef(null);
  const getAllCustomer = async () => {
    const { data } = await axios.get("http://localhost:3000/api/v1/jobs/");
    console.log(data);
    setProducts(data.customer);
    // setLazyLoading(false);
  };

  useEffect(() => {
    getAllCustomer();
    // ProductService.getProductsMini().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSeverity = (value) => {
    switch (value) {
      case true:
        return "success";

      case false:
        return "warning";
    }
  };
  //

  // const statusBodyTemplate = (rowData) => {
  //   return (
  //     <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
  //   );
  // };

  //

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const handleSubmit = async (event) => {
    console.log(event);
    try {
      const resp = await axios.patch(
        `http://localhost:3000/api/v1/jobs/${event._id}`,
        event
      );

      console.log(resp);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onRowEditComplete = async (e) => {
    console.log(e);
    // handleSubmit(e);

    let _products = [...products];
    let { newData, index } = e;
    console.log(newData);
    try {
      const resp = await axios.patch(
        `http://localhost:3000/api/v1/jobs/${newData._id}`,
        newData
      );

      //   console.log(resp);
      getAllCustomer();
      console.log("running");
      console.log(resp);
      console.log(newData);
      //   setCurrentCustomer(newData);
      console.log("runnign3");
    } catch (error) {
      console.log(error.message);
    }
    _products[index] = newData;
    console.log(_products);
    setProducts(_products);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses} //from line 15 the options
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };
  const interestEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={interestStatus} //from line 15 the options
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };
  const [handleDate, setHandleDate] = useState();
  const dateEditor = (options) => {
    // Update the date value and handle onChange event
    const handleDateChange = (e) => {
      const selectedDate = new Date(e.value);
      const date = new Date(selectedDate);
      const formattedDate = date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");
      console.log(formattedDate);
      setHandleDate(formattedDate);
      // options.value()

      options.editorCallback(formattedDate);
    };
    // console.log(options.value);
    return (
      <Calendar
        value={options.value}
        // onChange={(e) => options.editorCallback(e.value)}
        // dateFormat="dd/mm/yy"
        // showButtonBar
        // value={formattedDate}
        onChange={handleDateChange}
        // dateFormat="dd/mm/yy"
        dateFormat="dd-mm-yy"
        showTime={false}
        showButtonBar
      />
    );
  };
  const genderEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={genderStatus} //from line 15 the options
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };
  //
  const statusBodyTemplate = (rowData) => {
    console.log(rowData.duplicate);
    return (
      <Tag
        value={`${rowData.duplicate}`}
        severity={getSeverity(rowData.duplicate)}
      ></Tag>
    );
  };
  const statusFilterTemplate = (options) => {
    console.log(options.value);
    console.log(statuses);
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  //
  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(rowData.price);
  };

  //

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      // const newProducts=products.filter((i)=>)
      const updatedCustomer = products.map(
        ({ _id, __v, createdBy, ...rest }) => rest
      );
      const worksheet = xlsx.utils.json_to_sheet(updatedCustomer);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  //
  const renderHeader = () => {
    return (
      <div className="flex justify-content-center  gap-6 align-items-center">
        <FileUploadButton className="flex-grow-1" />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
        <div className="flex align-items-center justify-content-end gap-2">
          <Button
            type="button"
            icon="pi pi-file"
            rounded
            onClick={() => exportCSV(false)}
            data-pr-tooltip="CSV"
          />
          <Button
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          />
          {/* <Button
            type="button"
            icon="pi pi-file-pdf"
            severity="warning"
            rounded
            onClick={exportPdf}
            data-pr-tooltip="PDF"
          />  */}
        </div>
      </div>
    );
  };
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    customername: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // representativ: { value: null, matchMode: FilterMatchMode.IN },
    // status: { value: null, matchMode: FilterMatchMode.EQUALS },
    // verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    console.log(value);
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  console.log(filters);
  const header = renderHeader();
  const [balanceFrozen, setBalanceFrozen] = useState(false);

  // delete btn loading
  const [btnLoading, setBtnLoading] = useState(false);

  //delete
  const editButtonTemplate = (rowData) => {
    return (
      <Button
        onClick={() => handleEdit(rowData)}
        severity="danger"
        size="small"
      >
        Delete
      </Button>
    );
  };
  const DupicayIndicatorTemplate = (rowData) => {};
  //
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const handleEdit = useCallback((rowData) => {
    // Handle edit logic here, e.g. show a modal with the rowData details
    // const { data } = axios.delete(
    //   `http://localhost:3000/api/v1/jobs/${rowData._id}`
    // );
    // // console.log("Edit product:", rowData);
    // console.log("deleted");
    // handleModal(rowData);
    setCustomerToDelete(rowData);
    setVisible(true);
  }, []);

  // delete-function
  console.log(customerToDelete);
  const deleteCustomer = async () => {
    setBtnLoading(true);
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/jobs/${customerToDelete._id}`
      );
      console.log("running here");
      getAllCustomer();
      setVisible(false);
      setBtnLoading(false);
    } catch (error) {
      console.log("runnign error");
      console.log(error);
    }
  };
  // const handleModal = (rowData) => {
  //   setVisible(true);
  // };
  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        // onClick={() => setVisible(false)}
        onClick={() => deleteCustomer()}
        autoFocus
        loading={btnLoading}
      />
    </div>
  );
  return (
    <PageStyle>
      <div className="card p-fluid">
        {/* <ToggleButton
          checked={balanceFrozen}
          onChange={(e) => setBalanceFrozen(e.value)}
          onIcon="pi pi-lock"
          offIcon="pi pi-lock-open"
          onLabel="Balance"
          offLabel="Balance"
        /> */}
        <>
          <div className="card flex justify-content-center">
            {/* <Button
              label="Show"
              icon="pi pi-external-link"
              onClick={() => setVisible(true)}
            /> */}
            <Dialog
              header="Header"
              visible={visible}
              style={{ width: "50vw" }}
              onHide={() => setVisible(false)}
              footer={footerContent}
            >
              <p className="m-0">
                the action of deleting customer can not be reversed
              </p>
            </Dialog>
          </div>
        </>
        <DataTable
          value={products}
          editMode="row"
          dataKey="id"
          onRowEditComplete={onRowEditComplete}
          tableStyle={{ minWidth: "50rem" }}
          header={header}
          filters={filters}
          emptyMessage="No customers found."
          globalFilterFields={["customername", "phone"]}
          // scrollable
          ref={dt}
          scrollable
          scrollHeight="420px"
          virtualScrollerOptions={{ itemSize: 46 }}
        >
          {/* <Column
          field="code"
          header="Code"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column> */}
          <Column
            field="customername"
            header="Name"
            filterPlaceholder="Search by name"
            filter
            editor={(options) => textEditor(options)}
            style={{ width: "20%" }}
            required
            //   alignFrozen="left"
            //    frozen={balanceFrozen}
          ></Column>
          {/* interest change in line 15 */}
          {/* <Column
          field="inventoryStatus"
          header="Status"
          body={statusBodyTemplate}
          editor={(options) => statusEditor(options)}
          style={{ width: "20%" }}
        ></Column> */}
          {/* <Column
          field="price"
          header="Price"
          body={priceBodyTemplate}
          editor={(options) => priceEditor(options)}
          style={{ width: "20%" }}
        ></Column> */}
          <Column
            field="phone"
            header="phone"
            //   body={priceBodyTemplate}
            //   editor={(options) => priceEditor(options)}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="gender"
            header="Gender"
            //   body={priceBodyTemplate}
            editor={(options) => genderEditor(options)}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="interest"
            header="Interest"
            //   body={priceBodyTemplate}
            editor={(options) => interestEditor(options)}
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="dob"
            header="DOB"
            // body={handleDate} // Replace with your data field for the date
            editor={(options) => dateEditor(options)} // Use the dateEditor function as the editor
            style={{ width: "20%" }}
            // value={}
          ></Column>
          <Column
            field="duplicate"
            header="duplicacy"
            body={statusBodyTemplate}
            sortable
            filter
            filterElement={statusFilterTemplate}
            filterMenuStyle={{ width: "14rem" }}
            // body={handleDate} // Replace with your data field for the date
            // editor={(options) => dateEditor(options)} // Use the dateEditor function as the editor
            style={{ width: "20%" }}
            // value={}
          ></Column>
          {/* <Column
          field="dob"
          header="dob"
          //   body={priceBodyTemplate}
          //   editor={(options) => priceEditor(options)}
          style={{ width: "20%" }}
        ></Column> */}
          <Column header="Delete" body={editButtonTemplate}></Column>
          <Column
            rowEditor
            header="Edit"
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
            frozen={true}
            alignFrozen="right"
          ></Column>
        </DataTable>
      </div>
    </PageStyle>
  );
}
