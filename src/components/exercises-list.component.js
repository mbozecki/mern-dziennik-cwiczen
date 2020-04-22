import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>Edytuj</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Usuń</a>
      </td>
    </tr>
  )

export default class ExercisesList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state= {exercises:[]}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(response=> {
                this.setState({exercises: response.data}) //wloz wszystko z response do tablicy exercises[]
                })
            .catch((error)=>{
                console.log(error);
            })
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res=>console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el=>el._id!==id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise=>{
        return<Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }
  render() {
    return (
      <div>
        <h3 class="text-center mb-4">Zapisane ćwiczenia</h3>
        <table className="table">
          <thead className="thead-light"> 
            <tr>
              <th>Imię</th>
              <th>Ćwiczenie</th>
              <th>Czas wykonywania</th>
              <th>Data</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}