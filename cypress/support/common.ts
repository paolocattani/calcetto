export const imageSnapshotConfig = (name:string,percentage?:number) => ({
	imageConfig: {
		createDiffImage: true,					// Should a "diff image" be created, can be disabled for performance
		resizeDevicePixelRatio: true, // Resize image to base resolution when Cypress is running on high DPI screen, `cypress run` always runs on base resolution
		threshold: percentage || 0.01, 	// Amount in pixels or percentage before snapshot image is invalid
		thresholdType: "percent",       // Can be either "pixel" or "percent"
	},
	name,            // Naming resulting image file with a custom name rather than concatenating test titles
	separator: "@",  // Naming resulting image file with a custom separator rather than using the default ` #`
});



const dispatch = (action:any) => cy.window().its('store').invoke('dispatch', action)
