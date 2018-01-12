import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Bricksell extends React.Component {
    render(){
      return (
          <section id={'content-area'}>
            <div className="col-md-6 brick_one">
              <img className="brick_img" src="http://www.earlyadopter.co.kr/wp-content/uploads/2016/10/supreme-brick-1.jpg"
                heigt="300px" width="400px"
                />
              <div className="col-md-6 brick_info">
                <h5>Supreme</h5><br/>
                <h2>SUPREME NEW YORK BRICK FW 2016</h2>
                <p>Fancy Brick. Can you buy it?</p>
                <div class="action-btns">
                  <a class="col-md-6 red-hollow-btn">
                    <a class="price" id="btn-price">
                      $1000 add to cart
                    </a>
                  </a>
                  <a class="col-md-6 lightgrey-btn" id="btn-find">
                    find a store
                  </a>
                </div>
              </div>
            </div>
          </section>
      );
    }
}

export default Bricksell;
