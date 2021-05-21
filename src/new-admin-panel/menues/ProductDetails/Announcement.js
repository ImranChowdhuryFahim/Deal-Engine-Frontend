import React, { Component } from 'react'
import './Announcement.css'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import axios from "axios";

class Announcement extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            announcement: {},
            editorState: EditorState.createEmpty(),
          };
    }
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };
      handleAnnouncementTitle(event) {
        let createAnnouncement = this.state.announcement;
        createAnnouncement["title"] = event.target.value;
        this.setState({ announcement: createAnnouncement });
      }
      handleAnnouncementTarget(event) {
        let createAnnouncement = this.state.announcement;
        createAnnouncement["target"] = event.target.value;
        this.setState({ announcement: createAnnouncement });
      }
      handleCreateAnnouncement() {
        let createAnnouncement = this.state.announcement;
        createAnnouncement["body"] = draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        );
        this.setState({ announcement: createAnnouncement });
        console.log(this.state.announcement);
      }
    render()
    {
        function uploadImageCallBack(file) {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("file", file);
          //url changed
          axios.post(
            `https://nodeapi.beresearcherbd.com/api/uploadimage`,
            data
          ).then((res)=>{
            // console.log(res)
            resolve({ data: { link: res.data } })
          }).catch((err) => {
            reject(err)
          })
        });
      }
      return (
        <div className={"create-blog"}>
          <h1 className={"heading_name"}>Announcement Title</h1>
          <input
            type="text"
            placeholder="e.g. How to write a research paper"
            onChange={this.handleAnnouncementTitle.bind(this)}
          ></input>
  
          <h1 className={"heading_name"}>Choose Target</h1>
          <select onChange={this.handleAnnouncementTarget.bind(this)}>
            <option value={"Research Methodology"}>Research Methodology</option>
            <option value={"Research Basic"}>Upcoming course</option>
          </select>
  
          <div className="blog_write">
            <Editor
              editorState={this.state.editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
              placeholder="Announcement body...."
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: uploadImageCallBack,
                  alt: { present: true, mandatory: false },
                },
              }}
            />
          </div>
  
          <input
            type="submit"
            className={"post-button"}
            value={"Create Announcement"}
            onClick={this.handleCreateAnnouncement.bind(this)}
          ></input>
        </div>
      );
    }
}

export default Announcement