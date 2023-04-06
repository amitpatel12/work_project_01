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
  setIsEditing,
  isEditing,
  editingRecord
}) => {
  const [tags, setTags] = useState([]);
  const [tagData, setTagData] = useState();
  const Option = { Select };

  useEffect(() => {
    if(editingRecord)
    setTags([...editingRecord.tags]);
    setTagData('')
  },[isEditing]);


  const resetEditing = () => {
    setIsEditing(false);
    setEditingRecord(null);
  };

  const solve = (values) => {
    console.log(values)
    setDataSource((pre) => {
        return pre.map((student) => {
          if (student.id === editingRecord.id) {
            return editingRecord;
          } else {
            return student;
          }
        });
    resetEditing()
  });
}
  return (
    <div>
      <Modal
        title="Edit Student"
        visible={isEditing}
        okText="Save"
        footer={null}
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          resetEditing()
        }}
      >
        <Form onFinish={solve} name="hello">
          <Form.Item
            label="Title"
            rules={[{ required: true, message: "please input title" }]}
          >
            <Input
              type="text"
              value={editingRecord?.title}
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
            rules={[
              { required: true, message: "Please input about Description" },
            ]}
          >
            <Input.TextArea
              value={editingRecord?.description}
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
            defaultValue='Open'
              value= {editingRecord?.status}
              style={{ width: 120 }}
              onChange={(value) => {
                setEditingRecord((pre) => {
                  console.log(value);
                  return { ...pre, status: value };
                });
              }}
            >
              <Option value="Open">OPEN</Option>
              <Option value="Working">WORKING</Option>
              <Option value="Done">DONE</Option>
              <Option value="Overdue">OVERDUE</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Due Date"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <DatePicker
              onChange={(value, dateString) => {
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
            value = {tagData}
              onChange={(e) => {
                setTagData(e.target.value);
              }}
            />
          </Form.Item>

          <Button
            onClick={(e) => {
                e.preventDefault();
              setTags((prev) => {
                return [...prev, tagData];
              });
              
              setEditingRecord((pre) => {

                return { ...pre, tags: [...tags] };
              });
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
