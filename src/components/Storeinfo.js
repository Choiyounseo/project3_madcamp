import React from 'react';

class Storeinfo extends React.Component {
    render(){
        return (
            <div id="store_box">
              <div className="boss_box">
                <img className="store_locate_img" src="https://postfiles.pstatic.net/MjAxODAxMDlfMTMg/MDAxNTE1NTA0MjAyOTQy.nnU7m7tjWapN73JZaiZnGrAtt7JmaM1ogkguEuGv6m8g.IvcZA-xAv6FutPLHW7iahf6iwppLucksrL_w2ndKMcYg.JPEG.andr812/KakaoTalk_20180109_220924375.jpg?type=w580" height="480px" width="450px" />
                <div className="store_sentence">
                    <p>Call: 055-333-7007</p>
                    <p>Locate: 경남 김해시 활천로 181  ||  (지번) 어방동 1011-30 상가 B동 201 호 카베샷</p>
                    <p>Time: 매일 11:00 - 23:00  || 연중무휴</p>
                    <p>Naver Blog: <a href="http://cafe.naver.com/3203600">'http://cafe.naver.com/3203600'</a> </p>
                    <p>etc : 예약, 단체석, 주차, 포장, 무선 인터넷, 남/녀 화장실 구분 </p>
                </div>
              </div>

                <div className = "menu_coffee">
                    <div className="menu_coffee_name"><h3>직원 소개</h3></div>

                    <div className = "coffee_table">
                        <img className="coffee_img" src="https://scontent.ficn2-1.fna.fbcdn.net/v/t1.0-1/c1.0.539.539/15542364_586185301581251_6490881809092992810_n.jpg?oh=adfdea6633ceb52ff45f3803290d1fca&oe=5AFAB88C" height="200px" width="200px" />
                        <div className = "coffee_sentence">
                            <h10>백수영(본사 사장)</h10>
                            <p>항상 웃는 모습으로 고객님을 대하겠습니다.</p>
                        </div>
                    </div>

                    <div className = "coffee_table">
                        <img className="coffee_img" src="https://scontent.ficn2-1.fna.fbcdn.net/v/t1.0-9/22154417_1501108093300439_8873211318049633208_n.jpg?oh=abac957eeaf3650f666b060a227bf2fa&oe=5AEC9C87" height="200px" width="200px" />
                        <div className = "coffee_sentence">
                            <h10>허미나 (매니저)</h10>
                            <p>허허허</p>
                        </div>
                    </div>

                    <div className = "coffee_table">
                        <img className="coffee_img" src="https://scontent.ficn2-1.fna.fbcdn.net/v/t1.0-9/22528286_1797809290277504_6956154592677286245_n.jpg?oh=fe2eb81d173a5ad8f36c84c523cfa784&oe=5AE75C34" height="200px" width="200px" />
                        <div className = "coffee_sentence">
                            <h10>성재호 (해외 인턴)</h10>
                            <p>얼룩말 자전거 찾아요.... 혹시 얼룩말 자전거 보신분?!!</p>
                        </div>
                    </div>

                    <div className = "coffee_table">
                        <img className="coffee_img" src="https://scontent.ficn2-1.fna.fbcdn.net/v/t1.0-9/15095649_1134584453328758_2116034048314463357_n.jpg?oh=f82dc056301d1dcf627e28a11b68b911&oe=5AB22E15" height="200px" width="200px" />
                        <div className = "coffee_sentence">
                            <h10>신지훈(아르바이트)</h10>
                            <p>짧고 굵게</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Storeinfo;
