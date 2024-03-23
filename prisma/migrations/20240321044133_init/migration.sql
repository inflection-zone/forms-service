-- AlterTable
ALTER TABLE `form` MODIFY `DeletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `formsection` MODIFY `DeletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `formtemplate` MODIFY `DeletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `question` MODIFY `DeletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `response` MODIFY `DeletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `DeletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `userloginsessions` MODIFY `DeletedAt` DATETIME(3) NULL;
