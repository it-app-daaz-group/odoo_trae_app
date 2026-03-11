-- CreateTable
CREATE TABLE `sec_user` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(50) NOT NULL,
    `PasswordHash` VARCHAR(255) NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `IsCustomer` BOOLEAN NOT NULL DEFAULT false,
    `IsVendor` BOOLEAN NOT NULL DEFAULT false,
    `Status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    `Created_By` VARCHAR(100) NOT NULL,
    `Created_Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_By` VARCHAR(100) NULL,
    `Updated_Date` DATETIME(3) NULL,
    `Deleted_By` VARCHAR(100) NULL,
    `Deleted_Date` DATETIME(3) NULL,

    UNIQUE INDEX `sec_user_Username_key`(`Username`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_company` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Odoo_ID` INTEGER NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    `Created_By` VARCHAR(100) NOT NULL,
    `Created_Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Updated_By` VARCHAR(100) NULL,
    `Updated_Date` DATETIME(3) NULL,
    `Deleted_By` VARCHAR(100) NULL,
    `Deleted_Date` DATETIME(3) NULL,

    UNIQUE INDEX `mst_company_Odoo_ID_key`(`Odoo_ID`),
    UNIQUE INDEX `mst_company_Name_key`(`Name`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_user_company` (
    `User_ID` INTEGER NOT NULL,
    `Company_ID` INTEGER NOT NULL,

    PRIMARY KEY (`User_ID`, `Company_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rel_user_company` ADD CONSTRAINT `rel_user_company_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `sec_user`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_user_company` ADD CONSTRAINT `rel_user_company_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `mst_company`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
