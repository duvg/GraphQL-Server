import React, {Component} from 'react';

class Paginator extends Component {
    state = {
        paginator: {
            pages: Math.ceil(Number(this.props.total) / this.props.limit)
        }
    };
    render() {
        const { page } = this.props;

        // Previous button
        const btnPrevious = (page > 1) ?
            <button
                onClick={this.props.previousPage}
                type="button"
                className="btn btn-success"
            >&laquo; Anterior</button> : '';

        // Next button
        const {pages} = this.state.paginator;
        const btnNext =  (page < pages) ?
            <button
                onClick={this.props.nextPage}
                type="button"
                className="btn btn-success ml-1"
            >Siguente &raquo;</button> : '';

        var numbersPage = [];
        for (var i = 1; i <= this.props.total; i += 5){
            numbersPage.push(i);
            console.log(i - 1);
        }

        return (
            <div className="mt-5 d-flex justify-content-center">
                {btnPrevious}
                {numbersPage.map((offset, page) => {
                    return <button
                        onClick={this.props.goToPage.bind(this, offset - 1, page + 1)}
                        type="button"
                        key={page}
                        className={"ml-1 btn " + (this.props.page !== (page + 1) ? 'btn-success' : 'btn-primary')}
                    >{page + 1} </button>
                })}
                {btnNext}
            </div>
        );
    }
}

export default Paginator;