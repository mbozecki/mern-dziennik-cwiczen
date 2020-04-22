import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        // aby this zawsze sie dobrze odnosilo 
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);


        //tak tworzy sie "zmienne" w react
        this.state = { 
            username :'',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){ //laduje sie przed wszystkim innym na stronie
        axios.get('http://localhost:5000/users')
            .then(response=> {
                if (response.data.length>0)
                {
                    this.setState({
                        users:response.data.map(user=>user.username),
                        username:response.data[0].username
                    })
                }
            })
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault(); //zapobiega normalnemu zachowaniu htmla
        
        const exercise = {
            username : this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        
      
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add',exercise)
        .then(res=>console.log(res.data));
        
    


        window.location = '/'; //zabiera uzytkownika na strone główną
    }
    render() {
        return (
            <div>
                <h3 class="text-center mb-4">Dodaj nowe ćwiczenie</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Użytkownik: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {//array of users, mapa zwraca element z tablicy
                                        return<option //for each user in array, returns 
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>        
                    </div>
                    <div className="form-group"> 
          <label>Aktywność: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Czas wykonywania (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Data: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Dodaj ćwiczenie!" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}