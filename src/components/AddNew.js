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

const OpenModal = ({
    setDataSource,
  setEditingRecord,
  editingRecord,
  newEntry,
  setNewEntry
}) => {
  const [tags, setTags] = useState([]);
  const [tagData, setTagData] = useState();


  const Option = { Select };

useEffect(()=> {
    addIdDate()
    setTags([])
},[newEntry])


  const resetEditing = () => {
    setNewEntry(false);
    setEditingRecord(null);
  };

  const addIdDate = () => {
    const newDate = new Date().toDateString()
    const id = Math.floor(Math.random() * 1000)

    setEditingRecord((pre) => {
        return { ...pre, date: newDate, id: id };
      });
  }

  const solve = (values) => {
    addIdDate()
      setDataSource((prev) => {
        return [...prev, editingRecord, ];
      });
    console.log(values)
    console.log(editingRecord)

    resetEditing()
  };


  return (
    <div>
      <Modal
        title="Edit Student"
        visible={newEntry}
        okText="Save"
        footer={null}
        onCancel={() => {
          resetEditing();
        }}
        // onOk={() => {
        //   handleModalChange();
        // }}
      >
        <Form onFinish={solve}>
          <Form.Item
            label="Title"
            name='title'
            rules={[{ required: true, message: "please input title" }]}
          >
            <Input
            id="title"
              placeholder="please input title"
              onChange={(e) => {
                setEditingRecord((pre) => {
                  console.log(e.target.value);
                  return { ...pre, title: e.target.value };
                });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Desc"
            name='Description'
            rules={[
              { required: true, message: "Please input about Description" },
            ]}
          >
            <Input.TextArea
            id="Description"
              onChange={(e) => {
                setEditingRecord((pre) => {
                  console.log(e.target.value);
                  return { ...pre, description: e.target.value };
                });
              }}
              placeholder="Please input about Description"
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
            value='OPEN'
              style={{ width: 120 }}
              onChange={(value) => {
                setEditingRecord((pre) => {
                  console.log(value);
                  addIdDate()
                  return { ...pre, status: value };
                });
              }}
            >
              <Option value="OPEN">OPEN</Option>
              <Option value="WORKING">WORKING</Option>
              <Option value="DONE">DONE</Option>
              <Option value="OVERDUE">OVERDUE</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Due Date"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <DatePicker
              onChange={(value, dateString) => {
                addIdDate()
                setEditingRecord((pre) => {
                  console.log(dateString);
                  
                  return { ...pre, duedate: dateString };
                });
              }}
            />
          </Form.Item>

          {tags &&
            tags.map((item, i) => (
              <Tag color="blue" style={{ margin: "10px" }}>
                {item}
              </Tag>
            ))}

          <Form.Item label="Tags">
            <Input
            value={tagData}
              onChange={(e) => {
                setTagData(e.target.value);
              }}
            />
          </Form.Item>

          <Button
            onClick={() => {
                addIdDate()
              setTags((prev) => {
                return [...prev, tagData];
              });

              setEditingRecord((pre) => {
                
                return { ...pre, tags: [...tags]};
              })
                setTagData('')
            }}
          >
            Add Tags
          </Button>

          <Form.Item>
        <Button type="primary" htmlType="submit" style={{margin:'10px auto', textAlign: 'center'}}>
          Submit
        </Button>
      </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OpenModal;
