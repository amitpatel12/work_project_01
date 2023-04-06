import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Modal,
  Input,
  Form,
  Button,
  Select,
  DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import OpenModal from "./OpenModal";
import AddNew from "./AddNew";

const MyTable = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [newEntry, setNewEntry] = useState(false)

  const Option = { Select };

  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      title: "John Brown",
      date: "30",
      duedate: "2023-04-24",
      date: "Thu Apr 06 2023",
      description: "you can use Modal to create a new floating layer over the current page to get user feedback or display information.",
      status: "DONE",
      tags: ["nice", "developer", "yellow"],
    },
    {
      id: "2",
      title: "John Brown",
      date: "Thu Apr 01 2023",
      duedate: "2023-09-24",
      description: "New York No. 1 Lake Park",
      status: "OPEN",
      tags: ["nice", "developer", "web"],
    },
    {
      id: "3",
      title: "John Snow",
      date: "Thu Apr 03 2023",
      duedate: "2023-04-24",
      description: "When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow",
      status: "OVERDUE",
      tags: ["nice", "developer","mern"],
    }
  
  ]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      id: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      id: "description",
      width: 350,
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      id: "duedate",
    },

    {
      title: "TimeStamp",
      dataIndex: "date",
      id: "date",
    },

    {
      title: "Status",
      dataIndex: "status",
      id: "status",
      filters: [
        {
          text: "Done",
          value: "DONE",
        },
        {
          text: "Working",
          value: "WORKING",
        },
        {
          text: "Open",
          value: "OPEN",
        },
        {
          text: "Overdue",
          value: "OVERDUE",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => (
        <>
          <Tag color={status === "OVERDUE" ? "red" : "blue"} id={status}>
            {status}
          </Tag>
        </>
      ),
    },
    {
      title: "Tags",
      id: "tags",
      dataIndex: "tags",
      width: 300,
      render: (tags) => (
        <>
          {tags &&
            tags.map((tag) => (
              <Tag color="blue" id={tag}>
                {tag}
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: "Action",
      id: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              onClickEdit(record);
            }}
          />
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              onClickDelete(record);
            }}
          />
        </Space>
      ),
    },
  ];

  const onClickDelete = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const onClickEdit = (record) => {
    setIsEditing(true);
    setEditingRecord({ ...record });
    console.log(editingRecord);
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const handleModalChange = () => {

    console.log(editingRecord);
    setDataSource((prev) => {
      return [...prev, editingRecord];
    });

  };

  useEffect(() => {
    console.log(editingRecord);
  }, [editingRecord]);

  const handleAddBtn = () => {
    setNewEntry(true)
  };

  return (
    <>
      <h1>My Table</h1>
      <p>This is a table with Ant Design Pro Table</p>
      <Button style={{ margin: "10px" }} onClick={() =>handleAddBtn()}>
        Add New Entry
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        onChange={handleChange}
        pagination={{ pdateSize: 10 }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
      />

      <OpenModal
        setDataSource={setDataSource}
        setEditingRecord={setEditingRecord}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        editingRecord={editingRecord}
      />

  <AddNew
        setDataSource={setDataSource}
        setEditingRecord={setEditingRecord}
        editingRecord={editingRecord}
        newEntry = {newEntry}
        setNewEntry = {setNewEntry}
      />
    </>
  );
};

export default MyTable;
