// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
  const BASE_API_URL='http://localhost:3000'
export const environment = {
  production: true, 
  GOOGLE_CLIENT_ID:'520588449888-ebtjdjk2ssmo74qpn14qben52vgm3a8q.apps.googleusercontent.com',
  API_STUDENT:`${BASE_API_URL}/students`,
  API_Subject:`${BASE_API_URL}/subjects`
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
