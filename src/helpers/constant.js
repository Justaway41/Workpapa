let baseUrl = '';
let baseAPIUrl = '';
let baseUploadUrl = '';
const publicUrl = process.env.PUBLIC_URL;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000';
    baseAPIUrl = 'http://api.workpapa.com/API';
    baseUploadUrl = 'http://upload.workpapa.com';
} else if (process.env.NODE_ENV === 'mocks') {
    baseUrl = 'http://localhost:3000';
    baseAPIUrl = 'http://localhost:3000';
    baseUploadUrl = 'http://upload.workpapa.com';
} else {
    baseUrl = 'https://www.workpapa.com';
    baseAPIUrl = 'https://api.workpapa.com/API';
    baseUploadUrl = 'http://upload.workpapa.com';
}
export default class Globals {
    // static supportedCountry = ['ae', 'sa', 'sg', 'ca', 'us'];
    static supportedCountry = {
        in: {
            country_code: 'in',
            display_name: 'India',
            currency: 'inr'
        },
        ae: {
            country_code: 'ae',
            display_name: 'UAE',
            currency: 'aed'
        },
        sg: {
            country_code: 'sg',
            display_name: 'Singapore',
            currency: 'sgd'
        },
        ca: {
            country_code: 'ca',
            display_name: 'Canada',
            currency: 'cad'
        },
        us: {
            country_code: 'us',
            display_name: 'USA',
            currency: 'usd'
        }
    };
    static baseUrl = baseUrl;
    static uploadUrl = baseUploadUrl;
    static resumeUrl = `${Globals.uploadUrl}/resumes/`;
    static profilePicUrl = `${Globals.uploadUrl}/profile`;
    static resumeDoneUrl = `${Globals.uploadUrl}/resumedone/`;
    static resumeTemplateUrl = `${Globals.uploadUrl}/resume-template/`;
    static publicUrl = publicUrl;
    // public static stripeKey = 'pk_test_1JJKhZ3DycRrYqdE5GWzlbDd';
    static baseAPIUrl = baseAPIUrl; // 'https://www.workpapa.com/API';
    static API = {
        login: `${Globals.baseAPIUrl}/index.php?rquest=login`,
        resume_upload: `${Globals.baseAPIUrl}/index.php?rquest=uploadResume`,
        get_resume: `${Globals.baseAPIUrl}/index.php?rquest=getResume`,
        get_all_resume: `${Globals.baseAPIUrl}/index.php?rquest=getAllResume`,
        del_resume: `${Globals.baseAPIUrl}/index.php?rquest=deleteResume`,
        save_template: `${Globals.baseAPIUrl}/index.php?rquest=saveTemplate`,
        save_option: `${Globals.baseAPIUrl}/index.php?rquest=saveOption`,
        get_default_resume: `${Globals.baseAPIUrl}/index.php?rquest=getDefaultResume`,
        make_payment: `${Globals.baseAPIUrl}/index.php?rquest=takePayment`,
        make_payment_service: `${Globals.baseAPIUrl}/index.php?rquest=takePaymentService`,
        make_payment_paypal: `${Globals.baseAPIUrl}/index.php?rquest=takePaymentPaypal`,
        get_profile: `${Globals.baseAPIUrl}/index.php?rquest=getProfile`,
        make_payment_WCC: `${Globals.baseAPIUrl}/index.php?rquest=takePaymentWCC`,
        save_employer_email: `${Globals.baseAPIUrl}/index.php?rquest=saveEmployerEmail`,
        get_profile_viewed: `${Globals.baseAPIUrl}/index.php?rquest=getProfileViewed`,
        get_resume_viewed: `${Globals.baseAPIUrl}/index.php?rquest=getResumeViewed`,
        make_primary: `${Globals.baseAPIUrl}/index.php?rquest=makePrimary`,
        profile_upload: `${Globals.baseAPIUrl}/index.php?rquest=profileUpload`,
        save_resume_title: `${Globals.baseAPIUrl}/index.php?rquest=saveReumeTitle`,
        employer_feedback: `${Globals.baseAPIUrl}/index.php?rquest=saveFeedback`,
        save_profile: `${Globals.baseAPIUrl}/index.php?rquest=updateProfile`,
        contact_us: `${Globals.baseAPIUrl}/index.php?rquest=contactUs`,
        save_mailing_list: `${Globals.baseAPIUrl}/index.php?rquest=saveMailingListEmail`,
        check_discount: `${Globals.baseAPIUrl}/index.php?rquest=checkforDiscount`,
        save_service_request: `${Globals.baseAPIUrl}/index.php?rquest=saveServiceRequest`,
        save_other_service_request: `${Globals.baseAPIUrl}/index.php?rquest=saveOtherServiceRequest`,
        resume_feedback: `${Globals.baseAPIUrl}/index.php?rquest=saveFeedbackRequest`,
        get_geo: `${Globals.baseAPIUrl}/index.php?rquest=getGeoData`,
        get_category: `${Globals.baseAPIUrl}/local.php?rquest=getCategory`,
        get_zipcode: `${Globals.baseAPIUrl}/local.php?rquest=getZipCode`,
        get_converstion_rate: `${Globals.baseAPIUrl}/index.php?rquest=getConverstionRate`,
        final_price: `${Globals.baseAPIUrl}/index.php?rquest=getFinalPrice`,
        get_paid_service: `${Globals.baseAPIUrl}/index.php?rquest=getPaidService`,
        get_resume_track: `${Globals.baseAPIUrl}/index.php?rquest=getResumeTrack`,
        get_track_message: `${Globals.baseAPIUrl}/index.php?rquest=getTrackMessage`,
        send_track_message: `${Globals.baseAPIUrl}/index.php?rquest=sendTrackMessage`,
        // login_user_token: `${Globals.baseAPIUrl}/index.php?rquest=loginUserWithToken`,
        add_local_service: `${Globals.baseAPIUrl}/local.php?rquest=addLocalService`,
        get_local_searched: `${Globals.baseAPIUrl}/local.php?rquest=getLocalSearched`,
        get_local_detail: `${Globals.baseAPIUrl}/local.php?rquest=getLocalDetail`,
        save_resume_template: `${Globals.baseAPIUrl}/index.php?rquest=saveResumeTemplate`,
        get_rotation: `${Globals.baseAPIUrl}/index.php?rquest=getRotation`,
        get_completed_resume: `${Globals.baseAPIUrl}/index.php?rquest=getCompletedResume`,
        update_questionaire: `${Globals.baseAPIUrl}/index.php?rquest=updateQuestionaire`,
        forgot_password: `${Globals.baseAPIUrl}/index.php?rquest=forgotPassword`,
        get_pricing: `${Globals.baseAPIUrl}/index.php?rquest=getPricing`,
        get_pending_resume: `${Globals.baseAPIUrl}/index.php?rquest=getPendingResume`,
        save_order_salary: `${Globals.baseAPIUrl}/index.php?rquest=saveOrderSalary`,
        get_metadata: `${Globals.baseAPIUrl}/index.php?rquest=getStaticMetaData`,
        get_seolink: `${Globals.baseAPIUrl}/index.php?rquest=getSeoLink`,
        save_search: `${Globals.baseAPIUrl}/index.php?rquest=saveSearch`,
        get_site_location: `${Globals.baseAPIUrl}/index.php?rquest=getSiteLocation`,

        lib_home_category: `${Globals.baseAPIUrl}/index.php?rquest=getLibHomeCategory`,
        lib_document_details: `${Globals.baseAPIUrl}/index.php?rquest=getDocumentDetails`,
        lib_document_by_category: `${Globals.baseAPIUrl}/index.php?rquest=getDocumentForCategory`,

        wrt_register: `${Globals.baseAPIUrl}/writer.php?rquest=writerRegister`,
        wrt_get_profile: `${Globals.baseAPIUrl}/writer.php?rquest=getProfile`,
        wrt_get_profilebyid: `${Globals.baseAPIUrl}/writer.php?rquest=getProfileById`,
        wrt_login: `${Globals.baseAPIUrl}/writer.php?rquest=login`,
        wrt_get_feedback: `${Globals.baseAPIUrl}/writer.php?rquest=getFeedback`,
        wrt_get_skill: `${Globals.baseAPIUrl}/writer.php?rquest=getSkill`,
        wrt_get_country: `${Globals.baseAPIUrl}/writer.php?rquest=getCountry`,
        wrt_get_service_pending: `${Globals.baseAPIUrl}/writer.php?rquest=getPendingService`,
        wrt_start_writing: `${Globals.baseAPIUrl}/writer.php?rquest=startWriting`,
        wrt_resume_done: `${Globals.baseAPIUrl}/writer.php?rquest=markedResumeDone`,
        wrt_my_service: `${Globals.baseAPIUrl}/writer.php?rquest=getMyService`,
        wrt_get_user_message: `${Globals.baseAPIUrl}/writer.php?rquest=getUserMessages`,
        wrt_sent_user_message: `${Globals.baseAPIUrl}/writer.php?rquest=sendUserMessage`,
        wrt_get_user_questioner: `${Globals.baseAPIUrl}/writer.php?rquest=getUserQuestionaire`,
        wrt_document_upload: `${Globals.baseAPIUrl}/writer.php?rquest=uploadDocument`,

        ser_register: `${Globals.baseAPIUrl}/service.php?rquest=userRegister`,
        ser_create_service: `${Globals.baseAPIUrl}/service.php?rquest=createService`,
        ser_create_office_space: `${Globals.baseAPIUrl}/service.php?rquest=createOfficeSpace`,
        ser_get_office_space: `${Globals.baseAPIUrl}/service.php?rquest=getOfficeSpace`,
        ser_get_service: `${Globals.baseAPIUrl}/service.php?rquest=getService`,
        ser_get_service_id: `${Globals.baseAPIUrl}/service.php?rquest=getServiceById`,
        ser_get_office_id: `${Globals.baseAPIUrl}/service.php?rquest=getOfficeById`,
        ser_sent_user_message: `${Globals.baseAPIUrl}/service.php?rquest=sendUserMessage`,

    };
    static regExp = {
        //     email: '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    };
    static payment = {
        // stripeKey: 'pk_test_zn11EjYYG1snQa3HXmIkjggu'
        stripeKey: 'pk_live_Gn454lOZdY3rghaqUEr9rUka00adzedphc'
    };
    static loader = {
        smallbutton: 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
    };
    static months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    static community = {
        TRIAL: 7
    }
    static site = {
        FAST_SERVICE_RESUME_LIMIT: 4
    }
    static keys = {
        analytics: 'UA-123791717-1'
    }
}
