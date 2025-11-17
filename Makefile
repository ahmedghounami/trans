GREEN=\033[1;32m
YELLOW=\033[1;33m
RED=\033[1;31m
BLUE=\033[1;34m
NC=\033[0m

all:
	@echo -e "$(BLUE)[+] Starting Docker containers...$(NC)"
	@docker compose -f docker-compose.yml up --build
	@echo -e "$(GREEN)[✔] Containers are running!$(NC)"

down:
	@echo -e "$(YELLOW)[-] Stopping and removing containers...$(NC)"
	@docker compose -f docker-compose.yml down -v
	@echo -e "$(GREEN)[✔] Containers stopped and removed.$(NC)"

clean: down
	@echo -e "$(RED)[!] Removing volumes...$(NC)"
	@docker system prune -af --volumes
	@echo -e "$(GREEN)[✔] Cleanup complete!$(NC)"

restart: down all

re: clean all

users:
	@echo -e "$(BLUE)[+] Waiting for Elasticsearch to be ready...$(NC)"
	@until curl -k -u elastic:machidarouri https://localhost:9200 >/dev/null 2>&1; do \
		echo " - ES not ready yet..."; \
		sleep 3; \
	done
	@echo -e "$(GREEN)[✔] ES is UP — now creating users...$(NC)"
	@docker exec elasticsearch /usr/local/bin/setup-elk-users.sh
	@echo -e "$(GREEN)[✔] All ELK users created successfully!$(NC)"