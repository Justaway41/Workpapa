import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const Spinner = props =>
    (
        <div>
            {!!props.loader &&
                <div>
                    <div className="modal-backdrop fade in" />
                    <div className="fade in modal" style={{ display: 'block', paddingLeft: '0px', zIndex: '1060' }}>
                        <div className="modal-dialog modal-sm" style={{ top: '30%' }}>
                            <div className="modal-content" >
                                <div className="text-center modal-body">
                                    <div className="loader" style={{ margin: 'auto' }} />
                                    <div className="loadertext">
                                        <p>{ReactHtmlParser(props.message)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                // <div className="overlay">
                //     <div className="loaderarea">
                //         <div className="loader center" />
                //     </div>
                //     <div className="loadertext">
                //         <p>{ReactHtmlParser(props.message)}</p>
                //     </div>
                // </div>
            }
        </div>
    );

Spinner.defaultProps = {
    loader: false,
    message: 'Loading...'
};
export default Spinner;
