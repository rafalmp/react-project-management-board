import React from 'react';

export default function withDataFetching(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: true,
        error: '',
      }
    }

    async componentDidMount() {
      await fetch(this.props.dataSource)
        .then(response => response.json())
        .then(result => {
          this.setState({
            data: result,
          })
        })
        .catch(err => {
          this.setState({
            error: err.message,
          })
        })
        .finally(() => this.setState({ loading: false }));
    }

    render() {
      const { data, loading, error } = this.state;

      return (
        <WrappedComponent
          data={data}
          loading={loading}
          error={error}
          {...this.props}
        />
      );
    }
  }
}
