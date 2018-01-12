import React from 'react';
import { Link } from 'react-router';
import { Mypagelist } from 'components';
import { loginRequest } from 'actions/authentication';

class Coffeetable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            cocoffeename: "",
            cocost: ""
        };
        this.handleCoffee = this.handleCoffee.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleCoffee() {
        let coffeeusername = this.props.username;
        let coffeename = this.state.cocoffeename;
        let cost = this.state.cocost;

        this.props.onCoffee(coffeeusername, coffeename, cost).then(
            (success) => {
                if(!success) {
                    this.setState({
                        cocoffeename: '',
                        cocost: ''
                    });
                }
            }
        );
    }

    handleClick() {
        // Materialize.toast(this.props.username, 2000);
        Materialize.toast('장바구니에 담겼습니다!', 2000);
    }
    handleKeyPress(e) {
          if(e.charCode ===13 ){
              if(this.props.mode) {
                  this.handleLogin();
              } else {
                  this.handleRegister();
              }
          }
      }


    render(){

        const inputBoxes = (
          <div>
            <div className="input-field col s12 username">
                <label>Coffee name</label>
                <input
                  name="cocoffeename"
                  type="text"
                  className="validate"
                  value={this.state.cocoffeename}
                  onChange={this.handleChange}/>
            </div>
            <div className="input-field col s12 username">
                <label>cost</label>
                <input
                  name="cocost"
                  type="text"
                  className="validate"
                  value={this.state.cocost}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}/>
            </div>
          </div>
        );

        return (
            <div id="coffeelist">

                <div className = "coffee_table">
                    <img className="coffee_img" src="http://item.ssgcdn.com/14/43/16/item/1000013164314_i1_1200.jpg" height="300px" width="300px" />
                    <div className = "coffee_sentence">
                        <h10>하와이안 코나(Hawwaian Kona)</h10>
                        <p>부드러우면서도 톡 쏘는 신맛이 있고 향기도 좋기로 유명하다. 해발 4,000 미터의 높은 화산 산비탈 비옥한 땅에서 재배되며, 저녁에 마시기에 적당하지만, 생산량은 연간 500 여t 으로 매우 적어 가격이 비싸다.</p>
                        <div className="coffee_button">
                            <Link to ="/brick" ><button >20000 원</button> </Link>
                            <button onClick= {this.handleClick}> 장바구니 담기 </button>
                            {inputBoxes}
                        </div>
                    </div>
                </div>

                <div className = "coffee_table">
                    <img className="coffee_img" src="http://image.auction.co.kr/itemimage/e9/ba/31/e9ba31d96.jpg" height="300px" width="300px" />
                    <div className = "coffee_sentence">
                        <h10>콜롬비아 수프리모</h10>
                        <p>부드럽고 향이 좋아 아침을 깨우는 커피로 유명하며, 맛이 부드러워 여러 커피를 블렌딩해서 마시기에 적합하고 부담이 없다.</p>
                        <div className="coffee_button">
                            <button>15000 원</button>
                            <button onClick= {this.handleClick}>장바구니 담기</button>
                        </div>
                    </div>
                </div>

                <div className = "coffee_table">
                    <img className="coffee_img" src="http://item.ssgcdn.com/61/57/07/item/1000013075761_i1_254.jpg" height="300px" width="300px" />
                    <div className = "coffee_sentence">
                        <h10>케냐 AA</h10>
                        <p>해발 2,000 미터 이상의 케냐 고산지대에서 생산되는 케냐 AA는 덜 익은 과일의 새콤한 맛이 여운으로 남는 독특한 커피 맛의 매력이 있다.</p>
                        <div className="coffee_button">
                            <button>15000 원</button>
                            <button onClick= {this.handleClick}>장바구니 담기</button>
                        </div>
                    </div>
                </div>

                <div className = "coffee_table">
                    <img className="coffee_img" src="http://item.ssgcdn.com/14/18/12/item/1000013121814_i1_254.jpg" height="300px" width="300px" />
                    <div className = "coffee_sentence">
                        <h10>브라질 산토스(Santos)</h10>
                        <p>세계 최대 커피생산국인 브라질을 대표하는 산토스(Santos)는 신맛이 적고 부드러우며 여러 가지 맛이 적절하게 균형을 이룬다.</p>
                        <div className="coffee_button">
                            <button >10000 원</button>
                            <button onClick= {this.handleClick}>장바구니 담기</button>
                        </div>
                    </div>
                </div>

                <div className = "coffee_table">
                    <img className="coffee_img" src="http://item.ssgcdn.com/62/44/16/item/1000013164462_i1_254.jpg" height="300px" width="300px" />
                    <div className = "coffee_sentence">
                        <h10>예멘 모카(Mocha)</h10>
                        <p>예멘과 에티오피아에서 생산되는 커피로 부드러우면서도 초컬릿과 꽃향기가 풍부하고 신맛이 있어 저녁에 마시기 좋다.</p>
                        <div className="coffee_button">
                            <button>15000 원</button>
                            <button onClick= {this.handleClick}>장바구니 담기</button>
                        </div>
                    </div>
                </div>

                <div className = "coffee_table">
                    <img className="coffee_img" src="http://item.ssgcdn.com/49/41/16/item/1000013164149_i1_254.jpg" height="300px" width="300px" />
                    <div className = "coffee_sentence">
                        <h10>자마이카 블루마운틴(Blue Mountain)</h10>
                        <p>최상의 맛과 최고의 향을 갖춘 커피의 여왕인 블루 마운틴(Blud Mountain)은 신맛과 초콜릿 향이 우아한 것이 특징이고 생산량도 극히 적어 다른 아라비카 커피보다 평균 4 배 이상의 가격에 거래되고 있으며 카리브해의 자메이카 섬 블루 마운틴 산비탈에서 생산된다.</p>
                        <div className="coffee_button">
                            <button >15000 원</button>
                            <button onClick= {this.handleClick}>장바구니 담기</button>
                        </div>
                    </div>
                </div>

                <div className = "coffee_table">
                    <img className="coffee_img" src="http://item.ssgcdn.com/47/18/70/item/1000013701847_i1_254.jpg" height="300px" width="300px" />
                    <div className = "coffee_sentence">
                        <h10>르완다 버본</h10>
                        <p>아프리카의 특징적인 커피이며, 르완다에서 생산되는 원두는 95% 이상 아라비카 원본위주로 생산된다. 맛은 신맛의 산미가 부드러운, 오랜지나 블랙베리 계열의 시트러스 스타일의 뉘앙스를 가지고 있으며 깊고 부드럽고, 약간의 단맛의 여운이 있다.</p>
                        <div className="coffee_button">
                            <button>20000 원</button>
                            <button onClick= {this.handleClick}>장바구니 담기</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Coffeetable;
