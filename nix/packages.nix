{ nixpkgs ? import <nixpkgs> { } }:
let pkgs = {
  atomi = (
    with import (fetchTarball "https://github.com/kirinnee/test-nix-repo/archive/v8.1.0.tar.gz");
    {
      inherit pls;
      webstorm = jetbrains.webstorm;
    }
  );
  "Unstable 18th September 2021" = (
    with import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/9f75aabfb06346e7677fc3ad53cc9b6669eead61.tar.gz") { };
    {
      inherit
        pre-commit
        git
        shfmt
        shellcheck
        nixpkgs-fmt
        bash
        coreutils
        jq
        gnugrep;
        prettier = nodePackages.prettier;
    }
  );
  "Unstable 25th Janurary 2021" = (
    with import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/2d77d1ce9018.tar.gz") { };
    {
      inherit
        nodejs;
      pnpm = nodePackages.pnpm;
    }
  );
}; in
with pkgs;
pkgs."Unstable 18th September 2021" // pkgs.atomi // pkgs."Unstable 25th Janurary 2021"
