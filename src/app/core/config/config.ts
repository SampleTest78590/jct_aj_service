export class Config {
  public static disableNotifications = false;
  public static enableOtp = false;
  public static enablesocket = false;
  public static enableFirebase = false;

  public static vehicleLogUrl =
    'https://devnwnjd.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-client=186&sap-language=EN#ZHR_ESS-vehiclelog';
  public static covUrl =
    'https://devnwnjd.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-client=186&sap-language=EN#ZHR_ESS-covclv';

  public static enableFeedback = true;
  public static userCookie: any = {};
  public static domainUrl = window.location.origin;  
  public static userId = '';
  public static relianceEmailId = '';
  public static employeeName = '';
  public static contactNumber = '';
  public static managerId = '';
  public static bUnit = '';
  public static assignProfileId = [];
  public static isMobileDevice = false;
  public static isMobileViewport = window.innerWidth < 768 ? true : false;
  public static addBounceEffectOnEva: boolean = true;
  public static approvalsCount = 0;
  public static notificationCount = 0;
  public static isEvaNotificationCounterSet = false;
  public static initialChipsEvaBackend = [];
  public static isCordova = false;
  public static isManager = false;
  public static loggedIn = false;
  public static isCfUser = false;
  public static allowSetPassword = false;
  public static isCfUserCheckDone = false;
  public static apiVersion = '1.0';
  public static baseUrl = window.location.origin + '/api/';  
  public static currentBot = '';
  public static themeId = 'black-grey';
  public static emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static pancardregex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  public static onlyAlphabetsRegex = /^[a-zA-z]*$/;
  public static alphaNumbericRegex = /^[a-zA-z0-9]*$/;
  public static onlynumberregex = /^[0-9]*$/;
  public static backoffInterval = 0;
  public static limit = 20;
  public static days = 7;
  public static defaultStatusBarColorCode = '#3E659A';
  public static defaultFooterBgColorCode = '#fafafa';
  public static onChatbot: boolean = false;
  public static rilUserClass = 'ril-user';
  public static ouUserClass = 'ou-user';
  public static landingUrl = '';
  public static isRecruiter: boolean = false;
  public static isHiringManager: boolean = false;
  public static profileData: any;
  public static apm_obj = {};
  public static pwdRegex = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,13}'
  public static mhereDesktopErrorMsg =
    'M-here pro will be only available via Mobile';

  public static fileExtensionMimeType = new Map([
    ['pdf', 'application/pdf'],
    [
      'xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    ['xls', 'application/vnd.ms-excel'],
    ['png', 'image/png'],
    ['jpg', 'image/jpg'],
    ['jpeg', 'image/jpeg'],
    ['bmp', 'image/bmp'],
    ['csv', 'text/csv'],
    ['gif', 'image/gif'],
    ['txt', 'text/plain'],
    ['doc', 'application/msword'],
    [
      'docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    ['msg', 'application/vnd.ms-outlook'],
  ]);
  public static botIdentifier = {
    MY_HR: 'myHR',
    LVA: 'lva',
    LMS: 'lms',
    COVID: 'covid',
  };
  public static specialLeaveTypes = [
    'Special Leave',
    'Parental Leave',
    'Special Purpose Leave',
  ];
  public static apim_header = '';
  public static ws02_auth_url =
    Config.domainUrl + '/samlsso?spEntityID=NGQCLNT386';
  public static logoutUrl = '';
  public static timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  public static ISTtimezoneOffset = 19800000;

  public static elastic_search = Config.domainUrl + '/';
  public static userAppData = undefined;
  public static userProfileData: any = {};
  public static cleverTapUserObj = {};
  public static serviceEndPoint = Config.domainUrl + '/hrva';
  public static candidatebotEndPoint = Config.domainUrl + '/ijp';
  public static isUserOnChatBot = false;
  public static elasticSearchCount = 100;
  public static googleApiUrl = '';
  public static gamification_url = Config.domainUrl + 'game/';
  public static switchLoader = false;
  public static clevertap = {};
  public static currentcategory = '';
  public static tts_flag = false;
  public static isiOSDevice =
    !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
      ? true
      : false;
  public static headerBackClickHandler = undefined;
  public static navigateBackClickHandler = undefined;
  public static trippinBackClickHandler = undefined;
  public static bUnitJio = {
    users: [
      {
        P19507440: 'JIO',
      },
      {
        P30501933: 'JIO',
      },
      {
        P10061933: 'JIO',
      },
    ],
  };
  public static haptikSignedUp = false;
  //public static showLaunchMsg;
  public static haptikSettings = {};
  public static signUpObj = {};
  public static haptikAutoOpen = false;
  public static lms_haptik_obj = null;

  public static get APP_DATE_TIME_FORMATS(): any {
    return {
      APP_DATE_FORMAT: 'dd/MM/yyyy',
      APP_TIME_FORMAT: 'HH:mm',
      APP_TIME_FORMAT_LONG: 'HH:mm:ss',
      APP_DATE_TIME_FORMAT: 'dd/MM/yyyy HH:mm',
      APP_DAY_MONTH_FORMAT: 'EEE, MMM dd',
      APP_TIME_FORMAT_MERIDIEM: 'hh:mm a',
      APP_DATE_FORMAT_TEXT: 'dd MMM yyyy',
      APP_MONTH_YEAR_FORMAT: 'MMMM y',
      APP_DATE_MONTH_FORMAT: 'd MMM',
      APP_DATE_MONTH_YEAR_FORMAT: 'd MMM y',
      APP_SHORT_MONTH_YEAR_FORMAT: 'MMM, y',
    };
  }
  public static feedbackCategory = {
    great: 'Great',
    good: 'Good',
    ok: 'OK, can be better',
    needImp: 'Needs Improvement',
    terrible: 'Terrible',
    greatQ: 'What worked well?',
    goodQ: 'What can be improved?',
    terribleQ: 'What went wrong?',
  };

  // public static serch_icon_classes = {
  //   'apply a leave': 'ico-plan-my-leave',
  //   'plan my leave': 'ico-plan-my-leave',
  //   'leave reconciliation & history': 'ico-leave-reconciliation-history',
  //   'claims and reimbursements': 'ico-my-reimbursement',
  //   'my reimbursement': 'ico-my-reimbursement',
  //   payslip: 'ico-payslip',
  //   'view payslip': 'ico-payslip',
  //   'regularize my attendance': 'ico-regularise-attendance',
  //   'regularization history': 'ico-regularization-history',
  //   'regularization summary': 'ico-regularise-attendance',
  //   'medical services': 'ico-medical-service',
  //   'pme reports': 'ico-medical-service',
  //   'consult doctor': 'ico-medical-service',
  //   'schedule pme': 'ico-medical-service',
  //   'manage my attendance': 'ico-manage-my-attendance',
  //   approvals: 'ico-approvals',
  //   'team leave schedule': 'ico-team-attendance',
  //   'team punch report': 'ico-team-attendance',
  //   'team attendance': 'ico-team-attendance',
  //   'holiday calendar': 'ico-holiday-calendar',
  //   'view holiday calendar': 'ico-holiday-calendar',
  //   'bonafide letters': 'ico-bonafide-letter',
  //   'my learning': 'ico-my-learning',
  //   trippin: 'ico-share-a-ride',
  //   'digital form 16': 'ico-form16',
  //   'r-aadya': 'ico-r-aadya',
  //   workboard: 'ico-workboard',
  //   'generate visitor pass': 'ico-vms',
  //   'employee directory': 'ico-employee-directory',
  //   'total pay statement': 'ico-ctc-statement',
  //   'tax projection': 'ico-tax-projection',
  //   'power of attorney': 'ico-power-of-attorney',
  //   'learning recommendations': 'ico-learning-recommendation',
  //   'enroll for leadership program': 'ico-enroll-leadership-program',
  //   'leadership programs': 'ico-enroll-leadership-program',
  //   'search learning content': 'ico-search-learning',
  //   'national pension scheme': 'ico-nps',
  //   'medibuddy cards': 'ico-dhs',
  //   'internal job posting': 'ico-internal-job-posting',
  //   'my vehicle log book': 'ico-vehicle-log',
  //   'my retirals': 'ico-my-retirals',
  //   'my compensation details': 'ico-compensation-details',
  //   'company vehicle scheme': 'ico-clv',
  //   'manage e-file': 'ico-manage-e-file',
  //   'my organization relationship': 'ico-organization-relationship',
  //   'enroll for voluntary pf': 'ico-vpf',
  //   'education assistance': 'ico-educational-assistance',
  //   'submit an idea': 'ico-submit-an-idea',
  //   'input choice pay': 'ico-input-choice',
  //   'my insurance': 'ico-my-insurance',
  //   'my claims and insurance': 'ico-my-insurance',
  //   'certify own data': 'ico-update-profile',
  //   'my hr': 'ico-my-hr',
  //   'book meeting room': 'ico-book-meeting-room',
  //   'book astro turf': 'ico-book-astro-turf',
  //   'declare investments': 'ico-my-investments',
  //   'refer a friend': 'ico-refer-a-friend',
  //   'define job description': 'ico-define-job-description',
  //   'my visa application': 'ico-visa-application',
  //   'manage shift': 'ico-manage-shift',
  //   'team & self-expense report': 'ico-my-expense',
  //   course: 'ico-search-course',
  //   'news, announcements & circulars': 'upcoming-events',
  //   'employee communications & notices': 'upcoming-events',
  //   'r university': 'ico-my-learning',
  //   'view policies': 'ico-view-policies',
  //   'income tax declaration': 'ico-my-investments',
  //   'retiral benefits': 'ico-retirals-benefits',
  //   'discover reliance': 'ico-discover-reliance',
  //   'portals, websites & useful links': 'ico-portals-web-useful-link',
  //   'company news & spotlight': 'ico-ril-news-spotlight',
  //   survey: 'ico-survey',
  //   'request id card': 'ico-request-id-card',
  //   'date wise absence': 'ico-date-wise-absence',
  //   'games & challenges': 'ico-gamification',
  //   'time report (self)': 'ico-time-report-self',
  //   'separation request - self': 'ico ico-separation',
  //   'avail mobile connection': 'ico-my-mobile-connection',
  //   'photo id card approval': 'ico-hrbp-photo-id-card-approval',
  //   'r-sammaan': 'ico-r-sammaan',
  //   'r-performance': 'ico-r-performance',
  //   'loans & advances': 'ico-loans-advances',
  //   'hc confirmation process': 'ico-hc-confirmation-process',
  //   'manage my retirals': 'ico-manage-my-retirals',
  //   'my mobile connection': 'ico-my-mobile-connection',
  //   'time report (team)': 'ico-time-report-team',
  //   'hrbp to view employee profile': 'ico-hrbp-to-view-employee-profile',
  //   'track training completion': 'ico-track-training-completion',
  //   'position creation': 'ico-position-creation',
  //   'sim noc letter': 'ico-sim-noc-letter',
  //   'create hiring requisition': 'ico-create-hiring-requisition',
  //   'hr operations support service': 'ico-manage-om-request',
  //   'data validation': 'ico-data-certification',
  //   'my investments': 'ico-my-investments',
  //   'manage my tax': 'ico-manage-my-tax',
  //   'vehicle pass management': 'ico-vehicle-pass-management',
  //   'manage separation': 'ico-manage-separation',
  //   'my ril experience': 'ico-my-ril-experience',
  //   'person portrait': 'ico-person-portrait',
  //   'travel plan': 'ico-travel-plan',
  //   'm here': 'ico-m-here',
  //   'recruiter service': 'ico-recruiter-portal',
  //   'relicord by rls': 'ico-relicord',
  //   'e-learning': 'ico-e-learning',
  //   'training document upload': 'ico-training-document-upload',
  //   'family card': 'ico-family-card',
  //   'approval classical': 'ico-approval-classical',
  //   'my hr admin': 'ico-my-hr-admin',
  //   'organisation structure': 'ico-organisation-structure',
  //   'employee data dashboard': 'ico-employee-data-dashboard',
  //   'recruiter portal': 'ico-recruiter-portal',
  //   newsletter: 'ico-newsletters',
  //   'leave encashment': 'ico-leave-encashment',
  //   'offers withdrawn': 'ico-offers-withdrawn',
  //   'agency billing': 'ico-agency-billing',
  //   'offers onboarded last month': 'ico-offers-onboarded-last-month',
  //   'esos grant 2007': 'ico-esos-grant-2007',
  //   'esos administrative service': 'ico-esos-administrative-service',
  //   'my timesheet': 'ico-my-timesheet',
  //   'time sheet entry': 'ico-time-sheet-entry',
  //   'performance differentiation discussions':
  //     'ico-performance-differentiation-discussions',
  //   compensation: 'ico-compensation',
  //   'competency assurance system new': 'ico-competency-assurance-system-new',
  //   'pathfinder career path': 'ico-pathfinder-career-path',
  //   'educational assistance': 'ico-education-assistance',
  //   'separation/extension process': 'ico-separation-extension-hc-orgwide',
  //   'travel dashboard': 'ico-travel-dashboard',
  //   'document verification': 'ico-document-verification',
  //   'candidate search': 'ico-candidate-search',
  //   'admin recruitment dashboard': 'ico-admin-recruitment-dashboard',
  //   'admin recruiter workbench': 'ico-admin-recruitment-workbench',
  //   'hiring errors': 'ico-hiring-errors',
  //   'hrbp services': 'ico-hrbp-services',
  //   'hrbp separation overview': 'ico-hrbp-e-separation',
  //   'dues clearance': 'ico-dues-clearance',
  //   'digital personal file': 'ico-digital-personal-file',
  //   'retirals inward system': 'ico-retiral-inward-system',
  //   'retirals inward status': 'ico-retiral-inward-status',
  //   'retirals approval': 'ico-retiral-approval',
  //   'fc & a services': 'ico-fc-a-services',
  //   'cov services': 'ico-cov-services',
  //   'superannuation contribution': 'ico-superannuation-contribution',
  //   'just asq': 'ico-my-hr',
  //   'recruitment approval': 'ico-recruitment-approval',
  //   'students enrolment': 'ico-students-enrolment',
  //   'recruitment dashboard': 'ico-recruitment-dashboard',
  //   'my insurance retail': 'ico-my-insurance',
  //   'interview assistant jio': 'ico-interview-assistant-jio',
  //   'candidate onboarding': 'ico-candidate-onboarding',
  //   'pre-assessment session': 'ico-pre-assessment-session-jio',
  // };
  // public static errorHandler = {
  //   '0': 'There was an HTTP error. The server is not reachable. Status code: 0',

  //   '300':
  //     'There was an HTTP error. the request has more than one possible response. The user agent or user should choose one of them. Status code:300',
  //   '301':
  //     'There was an HTTP error. The URI of the requested resource has been changed. Status code: 301',
  //   '302':
  //     'There was an HTTP error. The URI of the requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests. Status code: 302',
  //   '303':
  //     'There was an HTTP error. The server sent this response to direct the client to get the requested resource to another URI with a GET request. Status code: 303',
  //   '304':
  //     'There was an HTTP error.  The client that the response has not been modified, so the client can continue to use the same cached version of the response. Status code: 304',
  //   '305':
  //     'There was an HTTP error. The requested response must be accessed by a proxy. This response code is not largely supported for security reasons. Status code: 305',
  //   '307':
  //     'There was an HTTP error. The requested resource resides temporarily under a different URI. Since the redirection MAY be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field. Status code: 307',
  //   '308':
  //     'There was an HTTP error. The requested resource is now permanently located at another URI, specified by the Location: HTTP Response header. Status code: 308',

  //   '400':
  //     "There was an HTTP error. The user's request contains incorrect syntax. Status code: 400",
  //   '401':
  //     'There was an HTTP error. The requested file requires authentication (a username and password). Status code: 401',
  //   '403':
  //     "There was an HTTP error. The server will not allow the visitor to access the requested file. If a visitor receives this code unexpectedly, you should check the file's permission settings, or check whether the file has been protected. Status code: 403",
  //   '404':
  //     'There was an HTTP error. The server could not find the file that the visitor requested maybe URL is mistyped. Status code: 404',
  //   '405':
  //     'There was an HTTP error. The method specified in the Request-Line is not allowed for the resource identified by the Request-URI. The response MUST include an Allow header containing a list of valid methods for the requested resource. Status code: 405',
  //   '406':
  //     'There was an HTTP error. The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request. Status code: 406',
  //   '407':
  //     'There was an HTTP error. The client must first authenticate itself. Status code: 407',
  //   '408':
  //     'There was an HTTP error. The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time. Status code: 408',
  //   '409':
  //     'There was an HTTP error. The request could not be completed due to a conflict with the current state of the resource. Status code: 409',
  //   '410':
  //     'There was an HTTP error. The requested resource is no longer available at the server and no forwarding address is known. Status code: 410',
  //   '411':
  //     'There was an HTTP error. The server refuses to accept the request without a defined Content- Length. Status code: 411',
  //   '412':
  //     'There was an HTTP error. The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server. Status code: 412',
  //   '413':
  //     'There was an HTTP error. The server is refusing to process a request because the request entity is larger than the server is willing or able to process. Status code: 413',
  //   '414':
  //     'There was an HTTP error. The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret. Status code: 414',
  //   '415':
  //     'There was an HTTP error. The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method. Status code: 415',

  //   '500':
  //     'There was an HTTP error. The server encountered an unexpected condition which prevented it from fulfilling the request. Status code: 500',
  //   '501':
  //     'There was an HTTP error. The server does not support the functionality required to fulfill the request. Status code: 501',
  //   '502':
  //     'There was an HTTP error. The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request. Status code: 502',
  //   '503':
  //     'There was an HTTP error. The server is unable to handle requests due to a temporary overload or due to the server being temporarily closed for maintenance. Status code: 503',
  //   '504':
  //     'There was an HTTP error. a server somewhere along the chain does not receive a timely response from a server further up the chain. Status code: 504',
  //   '505':
  //     'There was an HTTP error. The server refuses to support the HTTP protocol that has been specified by the client computer. Status code: 505',
  // };

  // public static loadBUConfiguration; //Used to load BUConfiguration class acc to bUnit.
  public static buGroup = '';
}
