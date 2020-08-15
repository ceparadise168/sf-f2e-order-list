import React from 'react';
import './App.css';
import styled from 'styled-components';

const pendingState = [1, 2]
const finishState = [3, 4]

class Item extends React.Component {
  render() {
    let isPending = pendingState.includes(this.props.status.code);
    let dateInfo = isPending ? `預計出貨 ${this.props.date}` : '';

    const Img = styled.img`
      filter: ${isPending ? 'grayscale(0%)' : 'grayscale(100%)'};
      max-width: 100%;
      padding: 15px;
    `
    const statusTypeStyle = isPending ? 'col-5 text-left pendingText' : 'col-5 text-left';
    return (
      <tr>
        <td width="140px" min-width="140px"><Img src={this.props.logo} alt="Italian Trulli" /></td>
        <td >
          <div className="row">
            <div className={statusTypeStyle}>{this.props.status.type}</div>
            <div className="col-7 text-right">{dateInfo}</div>
          </div>
          <div>{this.props.name}</div>
        </td>
      </tr>
    );
  }
}
class ItemList extends React.Component {
  render() {
    const Table = styled.table`
      font-size: 18px;
      width: 100%;
    `
    return (
      <div>
        <Table>
          <tbody>
            {this.props.orders.map((o, i) => {
              let { status, name, date, logo } = o
              return (<Item key={i} status={status} name={name} date={date} logo={logo} />)
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneOrdersList: [],
      pendingOrdersList: []
    }
    this.processOrderList();
  }

  getOrderList() {
    let data = {
      orders: [
        {
          name: 'Livi優活 抽取式衛生紙(100抽x10包x10串/箱)',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 3,
            type: '已取消'
          },
          date: '107/6/12'
        },
        {
          name: 'BALMUDA The Toaster 百慕達烤麵包機-黑色',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 2,
            type: '已成立'
          },
          date: '108/7/21'
        },
        {
          name: '贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 1,
            type: '處理中'
          },
          date: '108/6/2'
        },
        {
          name: 'Apple AirPds 2',
          logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
          status: {
            code: 4,
            type: '已送達'
          },
          date: '108/3/02'
        }
      ]
    }

    return data.orders;
  }

  processOrderList() {
    let data = this.getOrderList()

    data.sort((a, b) => {
      return (new Date(b.date)) - (new Date(a.date))
    });

    let doneOrdersList = []
    let pendingOrdersList = []

    data.forEach(d => {
      if (pendingState.includes(d.status.code)) {
        pendingOrdersList.push(d)
      }

      if (finishState.includes(d.status.code)) {
        doneOrdersList.push(d)
      }
    });

    this.state.doneOrdersList = doneOrdersList
    this.state.pendingOrdersList = pendingOrdersList
  }

  render() {
    const StatusTitle = styled.div`
      background: #F5F5F5;
      padding: 10px;
      border: 1px solid #E5E5E5;
    `

    const StatusTitleTag = styled.div`
      border-left: 8px solid green;
      padding-left: 5px;
    `
    return (
      <div>
        <div>
          <StatusTitle>
            <StatusTitleTag>
              進行中
            </StatusTitleTag>
          </StatusTitle>
          <ItemList orders={this.state.pendingOrdersList} />
        </div>
        <div>
          <StatusTitle>
            <StatusTitleTag>
              已完成
            </StatusTitleTag>
          </StatusTitle>
          <ItemList orders={this.state.doneOrdersList} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <OrderList />
      </div>
    );
  }
}

export default App;
