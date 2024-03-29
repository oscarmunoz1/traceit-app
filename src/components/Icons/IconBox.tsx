/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Flex } from '@chakra-ui/react';

type IconBoxProps = {
  children: React.ReactNode;
};

export default function IconBox(props: IconBoxProps) {
  const { children, ...rest } = props;

  return (
    <Flex alignItems={'center'} justifyContent={'center'} borderRadius={'12px'} {...rest}>
      {children}
    </Flex>
  );
}
