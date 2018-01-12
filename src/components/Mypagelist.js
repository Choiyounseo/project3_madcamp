import React from 'react';

class Mypagelist extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
              <div className = "mypage_table">
                  <div className="menu_coffee_name"><h3>구매 내역</h3></div>
                  <ul>
                    <li>커피 이름...</li>
                    <li>가격</li>
                    <li>구매한 날짜</li>
                  </ul>

              </div>
            </div>
        );
    }
}

export default Mypagelist;
