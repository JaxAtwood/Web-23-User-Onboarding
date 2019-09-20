import React, { useState, useEffect } from "react"; 
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import '../App.css';

const FaveMaynardSong = ({values, status}) => {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        if (status) {
            setSongs([...songs, status]);
        }
    }, [status]);

    return (
        <div className = "submissionForm">
            <Form>
                
                <label>Title</label>
                <Field type="text" name="name" placeholder="Name" />

                <label>Album</label>
                <Field type="text" name="album" placeholder="Album" />

                <label>band</label>
                <Field type="text" name="band" placeholder="Band" />
                
                <label>Click this box if you love Maynard:
                    <Field
                        type="checkbox"
                        name="bestbox"
                        checked={values.bestbox}
                    />
                </label>

                <label>Anything Else to Note?</label> 
                <Field 
                    component="textarea"
                    type="text"
                    name="notes"
                    placeholder="Notes"
                />
                <button>Submit!</button>
            </Form>
        </div>
    )
}


const FormikForm = withFormik({
    mapPropsToValues({ title, album, band, bestbox, notes }) {
        return {
            title: title || "",
            album: album || "",
            password: band || "",
            bestbox: bestbox || false,
            notes: notes || ""
        };
    },

handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(FaveMaynardSong);
console.log(FormikForm);
export default FormikForm;
