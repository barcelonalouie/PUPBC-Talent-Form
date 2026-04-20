import React, { useState } from "react";
import "./TalentForm.css";

const TalentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    talent: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.talent) {
      alert("Please select talent before submitting!");
      return;
    }

    try {
      const response = await fetch("https://barcelonaapi-ebeebdgbabc6fjbj.southeastasia-01.azurewebsites.net/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Success! Form Submitted Successfully.");
        console.log("API Response: ", result);

        setFormData({
          name: "",
          age: "",
          email: "",
          talent: ""
        });
      } else {
        alert("Server error: " + (result.message || "Failed to submit"));
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the API. Make sure your Azure server is running!");
    }
  };

  return (
    <div className="form-container">
      <h1>Talent Form for PUPBC</h1>
      <p>Fill out the details below if you're interested</p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="enter your age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="talent">Talent</label>
          <select
            id="talent"
            name="talent"
            value={formData.talent}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              select your talent
            </option>
            <option value="Singing">Singing</option>
            <option value="Dancing">Dancing</option>
            <option value="Poetry">Poetry</option>
          </select>
        </div>

        <button type="submit" className="Submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TalentForm;