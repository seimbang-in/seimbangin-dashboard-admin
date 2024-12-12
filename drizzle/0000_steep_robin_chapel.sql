-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `transaction_items` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`transaction_id` bigint NOT NULL,
	`item_name` text NOT NULL,
	`category` enum('food','transportation','utilities','entertainment','shopping','healthcare','education','others') DEFAULT 'others',
	`price` decimal NOT NULL,
	`quantity` int NOT NULL,
	`subtotal` decimal NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `transaction_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`type` int NOT NULL DEFAULT 0,
	`amount` decimal NOT NULL DEFAULT '0',
	`description` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`name` varchar(255) NOT NULL DEFAULT 'Transaction',
	`category` enum('food','transportation','utilities','entertainment','shopping','healthcare','education','others') DEFAULT 'others',
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_financial_profile` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`monthly_income` decimal(16,2),
	`current_savings` decimal(16,2),
	`debt` decimal(16,2),
	`financial_goals` text,
	`risk_management` enum('low','medium','high'),
	CONSTRAINT `user_financial_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`role` int NOT NULL DEFAULT 0,
	`full_name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`profile_picture` varchar(256),
	`created_at` timestamp,
	`updated_at` timestamp,
	`age` int NOT NULL DEFAULT 17,
	`balance` decimal(16,2) NOT NULL DEFAULT '0.00',
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `transaction_items` ADD CONSTRAINT `transaction_items_transaction_id_transactions_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_financial_profile` ADD CONSTRAINT `user_financial_profile_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
*/