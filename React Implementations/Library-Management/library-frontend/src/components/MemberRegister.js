import React, { useState } from "react";
import { registerMember } from "../services/memberService";

function MemberRegister() {

    const [member, setMember] = useState({
        name: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMember(member)
            .then(() => alert("Member Registered Successfully"))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Register Member</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <select name="role" onChange={handleChange}>
                    <option value="STUDENT">Student</option>
                    <option value="STAFF">Staff</option>
                    <option value="LIBRARIAN">Librarian</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default MemberRegister;
