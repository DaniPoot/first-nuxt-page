<template>
  <UDashboardGroup storage="local" storage-key="dashboard-sidebar" persistent>
    <DashboardSidebar />
    <UDashboardPanel>
      <DashboardNavbar />
      <div class="flex-1 orverflow-auto p-6">
        <slot />
      </div>
    </UDashboardPanel>

  </UDashboardGroup>
</template>