import { useState, useEffect } from "react"

function Form () {
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        height: '',
        mass: '',
        gender: '',
        eye_color: ''
    });

    const [readyForm, setReadyForm] = useState({
        name: '',
        lastname: '',
        height: '',
        mass: '',
        gender: '',
        eye_color: ''
    });

    let localForm = JSON.parse(localStorage.getItem('form'));

    useEffect(() => {
        fetch('https://swapi.dev/api/people/1')
        .then(res => res.json())
        .then(data => {
    
          setForm(prev => {
            let temp = {...prev}
            temp.name = data.name.split(' ')[0];
            temp.lastname = data.name.split(' ')[1];
            temp.height = data.height + ' ' + 'cm';
            temp.mass = data.mass + ' ' + 'kg';
            temp.gender = data.gender;
            temp.eye_color = data.eye_color; 
            return temp
          })
        })
    }, [])

    const inputTracking = (e) => {
        const { value, name } = e.target;
        console.log(e.target)
    
        setForm(prev => {
          let temp = {...prev};
          temp[name] = value;
          return temp;
        });
    }

    function sendForm () {
        setReadyForm(prev => {
            let temp = {...prev};
            temp.name = form.name;
            temp.lastname = form.lastname;
            temp.height = form.height;
            temp.mass = form.mass;
            temp.gender = form.gender;
            temp.eye_color = form.eye_color;
            localStorage.setItem('form', JSON.stringify(temp));
            return temp;
        })
    }

    function clearAll () {
        localStorage.removeItem('form');

        setForm(prev => {
            let temp = {...prev};
            temp.name = '';
            temp.lastname = '';
            temp.height = '';
            temp.mass = '';
            temp.gender = '';
            temp.eye_color = '';
            return temp;
        })

        setReadyForm(prev => {
                let temp = {...prev};
                temp.name = '';
                temp.lastname = '';
                temp.height = '';
                temp.mass = '';
                temp.gender = '';
                temp.eye_color = '';
                return temp;
            })
    }

    function showSavedForm () {
        if (localForm !== null) {
            setForm(prev => {
                let temp = {...prev};
                temp.name = localForm.name;
                temp.lastname = localForm.lastname;
                temp.height = localForm.height;
                temp.mass = localForm.mass;
                temp.gender = localForm.gender;
                temp.eye_color = localForm.eye_color;
                return temp;
            })
    
            setReadyForm(prev => {
                let temp = {...prev};
                temp.name = localForm.name;
                temp.lastname = localForm.lastname;
                temp.height = localForm.height;
                temp.mass = localForm.mass;
                temp.gender = localForm.gender;
                temp.eye_color = localForm.eye_color;
                return temp;
            })
        }
    }

    return (
        <section className="form-output_container">
            <div className="form">
                <input type="text" name="name" placeholder="*Name" value={form.name} onChange={e => {inputTracking(e)}}/>
                <input type="text" name="lastname" placeholder="*Lastname" value={form.lastname} onChange={e => {inputTracking(e)}}/>
                <input type="text" name="height" placeholder="Height" value={form.height} onChange={e => {inputTracking(e)}}/>
                <input type="text" name="mass" placeholder="Mass" value={form.mass} onChange={e => {inputTracking(e)}}/>
                <input type="text" name="gender" placeholder="Gender" value={form.gender} onChange={e => {inputTracking(e)}}/>
                <input type="text" name="eye_color" placeholder="Eye color" value={form.eye_color} onChange={e => {inputTracking(e)}}/>
                <div className="form-button_Container">
                    <button onClick={sendForm} className="form-button send">Send</button>
                    <button onClick={clearAll} className="form-button clear">Clear</button>
                    <button onClick={showSavedForm} className="form-button last">From the last send</button>
                </div>
            </div>
            <div className="output">
                <div className="output-line">
                    <span className="encoding">Name: </span>
                    <span className="encoding-data">{readyForm.name}</span>
                </div>
                <div className="output-line">
                    <span className="encoding">Lastname: </span>
                    <span className="encoding-data">{readyForm.lastname}</span>
                </div>
                <div className="output-line">
                    <span className="encoding">Height: </span>
                    <span className="encoding-data">{readyForm.height}</span>
                </div>
                <div className="output-line">
                    <span className="encoding">Mass: </span>
                    <span className="encoding-data">{readyForm.mass}</span>
                </div>
                <div className="output-line">
                    <span className="encoding">Gender: </span>
                    <span className="encoding-data">{readyForm.gender}</span>
                </div>
                <div className="output-line">
                    <span className="encoding">Eye color: </span>
                    <span className="encoding-data">{readyForm.eye_color}</span>
                </div>
            </div>
        </section>
    )
}

export default Form;