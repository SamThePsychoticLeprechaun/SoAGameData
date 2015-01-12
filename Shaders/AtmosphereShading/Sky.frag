//
// Atmospheric scattering fragment shader
//
// Author: Sean O'Neil
//
// Copyright (c) 2004 Sean O'Neil
//

// Uniforms
uniform vec3 unLightPos;
uniform float unG;
uniform float unG2;

// Input
in vec3 fRayDirection;
in vec3 fPrimaryColor;
in vec3 fSecondaryColor;

// Output
out vec4 pColor;

void main() {
  // Find Mie phase
  float theta = dot(unLightPos, fRayDirection) / length(fRayDirection);
  float miePhase = 1.5 * ((1.0 - unG2) / (2.0 + unG2)) * (1.0 + theta * theta) / pow(1.0 + unG2 - 2.0 * unG * theta, 1.5);
  
  // Calculate effect intensity
  float maxIntensity = max(max(fPrimaryColor.r, fPrimaryColor.b), fPrimaryColor.g) * 8;
  maxIntensity = min(maxIntensity, 1.0);

  // Accumulate both lighting values
  pColor = vec4(fPrimaryColor + miePhase * fSecondaryColor, maxIntensity);
}