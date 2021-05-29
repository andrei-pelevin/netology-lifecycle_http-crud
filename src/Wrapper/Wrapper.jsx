import { Component } from 'react';
import Card from './Card/Card';
class Wrapper extends Component {
    constructor(props) {
        super();
        this.state = { value: '', items: [] };
    }

    onChange = (e) => {
        this.setState(prev => ({ ...prev, value: e.target.value }))
    };

    getData() {
        fetch('http://localhost:7777/notes')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState(prev => ({ ...prev, items: response }))
                this.setState(prev => ({ ...prev, value: '' }))
            });
    }

    onSubmit = (event) => {
        event.preventDefault();
        let value = {
            value: this.state.value,

        };
        fetch('http://localhost:7777/notes', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(value)


        });
        this.getData();
    }

    onDel = (i) => {
        fetch(`http://localhost:7777/notes/${i}`, {
            method: 'DELETE',
            headers: {
            },

        });
        this.getData();
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className='Wrapper container border mt-3'>
                <div className='d-flex'><h2>Notes</h2> <span onClick={() => this.getData()} type="button" style={{paddingLeft: '20px', color: 'green', fontSize: '40px'}} className="material-icons">autorenew</span></div>
                

                <div className="d-flex flex-wrap">

                    {this.state.items.map((item) => <Card
                     value={item.value} 
                     id={item.id} 
                     key={item.id}
                     onDel={() => this.onDel(item.id)}
                     />)

                    }

                </div>


                <div>Новая карточка</div>
                <form onSubmit={this.onSubmit} className='position-relative'>
                    <textarea
                        name="note"
                        id="note"
                        cols="30"
                        rows="10"
                        value={this.state.value}
                        onChange={(e) => this.onChange(e)}
                    ></textarea>
                    <span onClick={this.onSubmit} type="button" style={{ left: '16%', bottom: '2%' , fontSize: '44px'}} className='position-absolute material-icons'>add_circle</span>
                </form>
                


            </div>
        )
    }
}

export default Wrapper;