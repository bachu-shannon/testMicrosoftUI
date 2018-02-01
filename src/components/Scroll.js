import React from 'react';
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';

export default class Scroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolledUp: false,
            scrolledDown: true
        }
    }

    onHandleScroll(event) {
        const thisScrollTop = event.target.scrollTop;
        const thisScrollHeight = event.target.scrollHeight;
        const thisHeight = event.target.offsetHeight;

        if (thisScrollTop === 0)
            this.setState({
                scrolledUp: false,
                scrolledDown: true
            });
        if (thisScrollTop === thisScrollHeight - thisHeight)
            this.setState({
                scrolledUp: true,
                scrolledDown: false
            });
    }

    handleClick(event) {
        this.runScroll(event);
    }

    runScroll(event) {
        const btnClicked = event.target;
        const el = document.getElementsByClassName('scroll-text')[0];
        const blockScrollHeight = document.getElementsByClassName('scroll-text')[0].scrollHeight;
        const blockHeight = document.getElementsByClassName('scroll-text')[0].offsetHeight;

        (btnClicked.classList.contains('btn-up')) ?
            this.scrollTo(el, 0, 600) :
            this.scrollTo(el, blockScrollHeight - blockHeight, 600);
    }

    scrollTo(element, to, duration) {
        let _duration = duration;
        if (_duration <= 0) return;
        const difference = to - element.scrollTop;
        const perTick = difference / _duration * 10;
        let interval = setInterval(function () {
            console.log(_duration);
            element.scrollTop = element.scrollTop + perTick;
            _duration -= 10;
            if (element.scrollTop === to) clearInterval(interval);
        }, 5);
    }

    renderScrollBlock() {
        return (
            <div className='scroll'>
                <DefaultButton
                    iconProps={{iconName: 'Up'}}
                    className={(this.state.scrolledUp) ? 'btn-up active' : 'btn-up'}
                    onClick={this.handleClick.bind(this)}
                >
                </DefaultButton>

                <div className="scroll-text" onScroll={this.onHandleScroll.bind(this)}>
                    <p className='text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium, amet
                        animi asperiores
                        aspernatur cumque dolor ea esse est facere id illum impedit iure maxime numquam odio optio
                        possimus
                        quaerat quibusdam quisquam reiciendis temporibus voluptate. Asperiores deleniti, nam? Commodi
                        consequatur deserunt distinctio, esse, est eveniet modi mollitia, nesciunt non quae quibusdam
                        sequi
                        temporibus vitae voluptatem voluptatum! Amet cumque debitis delectus doloremque ducimus esse
                        fuga in
                        inventore, ipsum praesentium rem, unde voluptatum! A alias animi architecto blanditiis
                        consequuntur
                        dicta dolorem error excepturi explicabo facilis inventore ipsa ipsam labore maiores, neque
                        nesciunt
                        numquam odio optio perferendis quae quaerat quam quas quia quibusdam ratione recusandae
                        repudiandae
                        sed tempore unde voluptatem. Accusamus, aliquid, dolore explicabo hic incidunt itaque laborum
                        minima
                        natus provident tempora velit voluptate. Aliquid cumque deleniti eveniet facere incidunt ipsa
                        magni
                        minima nesciunt nostrum, similique, tenetur voluptatum. Adipisci aliquam distinctio dolorem
                        dolorum
                        ducimus et fugiat fugit labore maiores natus possimus, quae rerum similique temporibus voluptas!
                        Adipisci animi asperiores, aut commodi ducimus, eligendi facilis fuga hic, illo ipsum iusto
                        laudantium magnam maiores maxime necessitatibus nesciunt nihil nobis non omnis pariatur placeat
                        quas
                        quisquam sapiente tenetur veniam vitae voluptatum? Alias modi officiis optio provident quibusdam
                        vel. Dolorem eum nihil reiciendis soluta voluptate! Harum, quibusdam.</p>
                </div>

                <DefaultButton
                    iconProps={{iconName: 'Down'}}
                    className={(this.state.scrolledDown) ? 'btn-down active' : 'btn-down'}
                    onClick={this.handleClick.bind(this)}
                >
                </DefaultButton>
            </div>
        );
    }

    render() {
        return this.renderScrollBlock();
    }
}