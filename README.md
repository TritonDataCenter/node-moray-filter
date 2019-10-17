<!--
    Copyright 2019 Joyent, Inc.
-->

# moray-filter

This repository is part of the Joyent Triton and Joyent Manta projects. See the
[Triton](https://github.com/joyent/triton/blob/master/CONTRIBUTING.md) and
[Manta](https://github.com/joyent/manta/blob/master/CONTRIBUTING.md)
contributing guidelines and general documentation at the main [Triton]
(https://github.com/joyent/triton) and [Manta](http://github.com/joyent/manta)
project pages.

## Overview

API for handling Moray-style filters, which are similar to LDAP filters, but
with several differences:

- Allow escaping `(`, `)`, `\`, `=`, and `*` with a backslash (`\`).
- Don't require parentheses around a not (`!`) filter.

This project is a fork of
[ldap-filter](https://github.com/pfmooney/node-ldap-filter), which
was originally derived from the filter code in
[LDAPjs](https://github.com/mcavage/node-ldapjs).

## License

MIT.
