/**
 * A large, realistic set of boot log messages for the terminal startup sequence,
 * based on a real arch boot journal.
 * Timestamps are intentionally omitted for a cleaner simulation.
 * Delays are specified per-line to override the default rapid-fire printing, creating a more dynamic pace.
 */
export interface BootLogLine {
    text: string;
    delay?: number; // Optional override for default delay
}

export const BOOT_LOGS: BootLogLine[] = [
    {
        text: 'kernel: Linux version 6.14.0-dy-portfolio (buildd@lcy02-amd64-067) (gcc 13.3.0) #36~24.04.1-arch',
    },
    {
        text: 'kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-6.14.0-36-generic root=UUID=... ro quiet splash',
    },
    { text: 'kernel: KERNEL supported cpus:' },
    { text: 'kernel:   Intel GenuineIntel' },
    { text: 'kernel:   AMD AuthenticAMD' },
    { text: 'kernel:   Centaur CentaurHauls' },
    { text: 'kernel: BIOS-provided physical RAM map:' },
    {
        text: 'kernel: BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable',
    },
    {
        text: 'kernel: BIOS-e820: [mem 0x00000000000a0000-0x00000000000fffff] reserved',
    },
    {
        text: 'kernel: BIOS-e820: [mem 0x0000000000100000-0x00000000c347ffff] usable',
    },
    {
        text: 'kernel: BIOS-e820: [mem 0x00000000c3480000-0x00000000cfffffff] reserved',
    },
    {
        text: 'kernel: BIOS-e820: [mem 0x0000000100000000-0x000000082f37ffff] usable',
    },
    { text: 'kernel: NX (Execute Disable) protection: active' },
    {
        text: 'kernel: DMI: ASUS System Product Name/PRIME B550M-K, BIOS 3607 03/18/2024',
    },
    { text: 'kernel: random: crng init done' },
    { text: 'kernel: tsc: Detected 3500.140 MHz processor' },
    { text: 'kernel: RAMDISK: [mem 0xb1535000-0xb62b7fff]' },
    { text: 'kernel: ACPI: Early table checksum verification disabled' },
    { text: 'kernel: ACPI: RSDP 0x00000000CA707014 000024 (v02 ALASKA)' },
    {
        text: 'kernel: ACPI: XSDT 0x00000000CA706728 0000D4 (v01 ALASKA A M I    01072009 AMI  01000013)',
    },
    { text: 'kernel: No NUMA configuration found' },
    {
        text: 'kernel: Faking a node at [mem 0x0000000000000000-0x000000082f37ffff]',
    },
    { text: 'kernel: Zone ranges:' },
    { text: 'kernel:   DMA      [mem 0x0000000000001000-0x0000000000ffffff]' },
    { text: 'kernel:   DMA32    [mem 0x0000000001000000-0x00000000ffffffff]' },
    {
        text: 'kernel:   Normal   [mem 0x0000000100000000-0x000000082f37ffff]',
    },
    { text: 'kernel: ACPI: PM-Timer IO Port: 0x808' },
    { text: 'kernel: ACPI: LAPIC_NMI (acpi_id[0xff] high edge lint[0x1])' },
    {
        text: 'kernel: IOAPIC[0]: apic_id 13, version 33, address 0xfec00000, GSI 0-23',
    },
    {
        text: 'kernel: IOAPIC[1]: apic_id 14, version 33, address 0xfec01000, GSI 24-55',
    },
    {
        text: 'kernel: ACPI: Using ACPI (MADT) for SMP configuration information',
    },
    { text: 'kernel: smp: Bringing up secondary CPUs ...', delay: 150 },
    { text: 'kernel: smp: Brought up 1 node, 12 CPUs' },
    {
        text: 'kernel: smpboot: Total of 12 processors activated (84003.36 BogoMIPS)',
    },
    { text: 'kernel: devtmpfs: initialized' },
    {
        text: 'kernel: clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff',
    },
    { text: 'kernel: pinctrl core: initialized pinctrl subsystem' },
    { text: 'kernel: PM: RTC time: 05:37:14, date: 2025-12-02' },
    { text: 'kernel: NET: Registered PF_NETLINK/PF_ROUTE protocol family' },
    { text: 'kernel: cpuidle: using governor menu' },
    {
        text: 'kernel: PCI: ECAM [mem 0xf0000000-0xf7ffffff] (base 0xf0000000) for domain 0000 [bus 00-7f]',
    },
    { text: 'kernel: ACPI: [Firmware Bug]: BIOS _OSI(Linux) query ignored' },
    { text: 'kernel: ACPI: Interpreter enabled', delay: 200 },
    { text: 'kernel: ACPI: PM: (supports S0 S3 S4 S5)' },
    { text: 'kernel: ACPI: Using IOAPIC for interrupt routing' },
    {
        text: 'kernel: PCI: Using host bridge windows from ACPI; if necessary, use "pci=nocrs"',
    },
    { text: 'kernel: PCI host bridge to bus 0000:00' },
    {
        text: 'kernel: pci 0000:00:01.1: [1022:1483] type 01 class 0x060400 PCIe Root Port',
    },
    {
        text: 'kernel: pci 0000:00:03.1: [1022:1483] type 01 class 0x060400 PCIe Root Port',
    },
    {
        text: 'kernel: pci 0000:00:08.1: [1022:1484] type 01 class 0x060400 PCIe Root Port',
    },
    {
        text: 'kernel: pci 0000:0b:00.0: [10de:2582] type 00 class 0x030000 PCIe Legacy Endpoint',
    },
    {
        text: 'kernel: pci 0000:01:00.0: [126f:2263] type 00 class 0x010802 PCIe Endpoint',
    },
    {
        text: 'kernel: pci 0000:0a:00.0: [10ec:8168] type 00 class 0x020000 PCIe Endpoint',
    },
    { text: 'kernel: iommu: Default domain type: Translated' },
    { text: 'kernel: SCSI subsystem initialized' },
    { text: 'kernel: usbcore: registered new interface driver usbfs' },
    { text: 'kernel: usbcore: registered new device driver usb' },
    {
        text: 'kernel: Trying to unpack rootfs image as initramfs...',
        delay: 250,
    },
    { text: 'kernel: Freeing initrd memory: 79372K' },
    { text: 'kernel: AMD-Vi: Interrupt remapping enabled' },
    {
        text: 'kernel: PCI-DMA: Using software bounce buffering for IO (SWIOTLB)',
    },
    {
        text: 'kernel: software IO TLB: mapped [mem 0x00000000bd5f4000-0x00000000c15f4000] (64MB)',
    },
    { text: 'kernel: Key type asymmetric registered' },
    {
        text: 'kernel: Block layer SCSI generic (bsg) driver version 0.4 loaded (major 243)',
    },
    { text: 'kernel: io scheduler mq-deadline registered' },
    { text: 'kernel: pcieport 0000:00:07.1: AER: enabled with IRQ 30' },
    {
        text: 'kernel: input: Power Button as /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0C0C:00/input/input0',
    },
    {
        text: 'kernel: Serial: 8250/16550 driver, 32 ports, IRQ sharing enabled',
    },
    {
        text: 'kernel: 00:04: ttyS0 at I/O 0x3f8 (irq = 4, base_baud = 115200) is a 16550A',
    },
    { text: 'kernel: loop: module loaded' },
    { text: 'kernel: xhci_hcd 0000:02:00.0: xHCI Host Controller' },
    {
        text: 'kernel: xhci_hcd 0000:02:00.0: new USB bus registered, assigned bus number 1',
    },
    { text: 'kernel: hub 1-0:1.0: USB hub found' },
    { text: 'kernel: xhci_hcd 0000:0d:00.3: xHCI Host Controller' },
    {
        text: 'kernel: xhci_hcd 0000:0d:00.3: new USB bus registered, assigned bus number 3',
    },
    { text: 'kernel: hub 3-0:1.0: USB hub found' },
    {
        text: 'kernel: device-mapper: ioctl: 4.49.0-ioctl (2025-01-17) initialised: dm-devel@lists.linux.dev',
    },
    { text: 'kernel: NET: Registered PF_INET6 protocol family' },
    { text: 'kernel: microcode: Current revision: 0x0a201210' },
    { text: 'kernel: resctrl: L3 allocation detected' },
    { text: 'kernel: Freeing unused kernel image (initmem) memory: 5140K' },
    { text: 'kernel: Write protecting the kernel read-only data: 38912k' },
    { text: 'kernel: Run /init as init process', delay: 100 },
    { text: 'kernel:   with arguments: /init splash' },
    {
        text: 'kernel: usb 3-1: new full-speed USB device number 2 using xhci_hcd',
    },
    {
        text: 'kernel: usb 1-1: new full-speed USB device number 2 using xhci_hcd',
    },
    { text: 'kernel: ahci 0000:02:00.1: version 3.0' },
    { text: 'kernel: scsi host0: ahci' },
    { text: 'kernel: scsi host1: ahci' },
    { text: 'kernel: nvme nvme0: pci function 0000:01:00.0' },
    {
        text: 'kernel: r8169 0000:0a:00.0 eth0: RTL8168h/8111h, 08:bf:b8:03:ab:89, XID 541, IRQ 63',
    },
    {
        text: 'kernel: nvme nvme0: allocated 64 MiB host memory buffer (1 segment).',
    },
    { text: 'kernel:  nvme0n1: p1 p2 p3 p4 p5 p6 p7' },
    {
        text: 'kernel: usb 3-1: New USB device found, idVendor=3434, idProduct=0230, bcdDevice= 1.01',
    },
    { text: 'kernel: usb 3-1: Product: Keychron K3 Pro' },
    { text: 'kernel: hid: raw HID events driver (C) Jiri Kosina' },
    { text: 'kernel: usb 1-1: Product: USB Receiver' },
    { text: 'kernel: usb 1-1: Manufacturer: Logitech' },
    { text: 'kernel: ata1: SATA link up 6.0 Gbps (SStatus 133 SControl 300)' },
    { text: 'kernel: ata1.00: ATA-10: CT1000MX500SSD1, M3CR032, max UDMA/133' },
    {
        text: 'kernel: scsi 0:0:0:0: Direct-Access     ATA      CT1000MX500SSD1  032  PQ: 0 ANSI: 5',
    },
    {
        text: 'kernel: sd 0:0:0:0: [sda] 1953525168 512-byte logical blocks: (1.00 TB/932 GiB)',
    },
    { text: 'kernel:  sda: sda2 sda3' },
    { text: 'kernel: sd 0:0:0:0: [sda] Attached SCSI disk' },
    {
        text: 'kernel: usb 1-2: new full-speed USB device number 3 using xhci_hcd',
    },
    { text: 'kernel: clocksource: Switched to clocksource tsc' },
    { text: 'kernel: Btrfs loaded, zoned=yes, fsverity=yes' },
    {
        text: 'kernel: EXT4-fs (nvme0n1p5): mounted filesystem c24f7bdd-735f-4011-9167-47612335f908 ro with ordered data mode. Quota mode: none.',
    },
    { text: "systemd[1]: Inserted module 'autofs4'" },
    {
        text: 'systemd[1]: systemd 255.4-1arch8.11 running in system mode (+PAM +AUDIT +SELINUX +APPARMOR +IMA)',
    },
    { text: 'systemd[1]: Detected architecture x86-64.' },
    { text: 'systemd[1]: Hostname set to <arch-pc>.' },
    {
        text: 'systemd[1]: Queued start job for default target graphical.target.',
        delay: 100,
    },
    { text: 'systemd[1]: Created slice user.slice - User and Session Slice.' },
    { text: 'systemd[1]: Reached target slices.target - Slice Units.' },
    {
        text: 'systemd[1]: Listening on systemd-journald.socket - Journal Socket.',
    },
    {
        text: 'systemd[1]: Starting systemd-journald.service - Journal Service...',
    },
    {
        text: 'systemd[1]: Starting systemd-modules-load.service - Load Kernel Modules...',
    },
    {
        text: 'systemd[1]: Starting systemd-remount-fs.service - Remount Root and Kernel File Systems...',
    },
    {
        text: 'systemd[1]: Mounted dev-hugepages.mount - Huge Pages File System.',
    },
    {
        text: 'systemd[1]: Finished kmod-static-nodes.service - Create List of Static Device Nodes.',
    },
    { text: 'systemd-journald[429]: Journal started' },
    { text: "systemd-modules-load[445]: Inserted module 'lp'" },
    { text: "systemd-modules-load[445]: Inserted module 'msr'" },
    {
        text: 'kernel: EXT4-fs (nvme0n1p5): re-mounted c24f7bdd-735f-4011-9167-47612335f908 r/w.',
    },
    {
        text: 'systemd[1]: Finished systemd-remount-fs.service - Remount Root and Kernel File Systems.',
    },
    { text: 'systemd[1]: Activating swap swap.img.swap - /swap.img...' },
    {
        text: 'kernel: Adding 8388604k swap on /swap.img.  Priority:-2 extents:65 across:148766720k SS',
    },
    { text: 'systemd[1]: Activated swap swap.img.swap - /swap.img.' },
    { text: 'systemd[1]: Reached target swap.target - Swaps.' },
    {
        text: 'systemd[1]: Started systemd-journald.service - Journal Service.',
        delay: 100,
    },
    {
        text: 'systemd[1]: Starting systemd-journal-flush.service - Flush Journal to Persistent Storage...',
    },
    {
        text: "systemd-udevd[466]: Using default interface naming scheme 'v255'.",
    },
    {
        text: 'systemd[1]: Finished systemd-modules-load.service - Load Kernel Modules.',
    },
    {
        text: 'systemd[1]: Starting systemd-sysctl.service - Apply Kernel Variables...',
    },
    {
        text: 'systemd[1]: Started systemd-udevd.service - Rule-based Manager for Device Events and Files.',
    },
    {
        text: 'systemd[1]: Finished systemd-journal-flush.service - Flush Journal to Persistent Storage.',
    },
    {
        text: 'systemd[1]: Finished systemd-sysctl.service - Apply Kernel Variables.',
    },
    {
        text: 'systemd[1]: Started systemd-rfkill.service - Load/Save RF Kill Switch Status.',
    },
    {
        text: 'systemd[1]: Reached target local-fs.target - Local File Systems.',
    },
    {
        text: 'systemd[1]: Starting apparmor.service - Load AppArmor profiles...',
    },
    {
        text: 'systemd[1]: Starting systemd-binfmt.service - Set Up Additional Binary Formats...',
    },
    {
        text: 'systemd[1]: Starting systemd-tmpfiles-setup.service - Create Volatile Files and Directories...',
    },
    { text: 'systemd[1]: Starting ufw.service - Uncomplicated firewall...' },
    { text: 'systemd[1]: Finished ufw.service - Uncomplicated firewall.' },
    {
        text: 'systemd[1]: Reached target network-pre.target - Preparation for Network.',
    },
    {
        text: 'systemd[1]: Finished systemd-binfmt.service - Set Up Additional Binary Formats.',
    },
    {
        text: 'apparmor.systemd[965]: Warning: found usr.sbin.sssd in /etc/apparmor.d/force-complain, forcing complain mode',
    },
    { text: 'systemd[1]: Finished apparmor.service - Load AppArmor profiles.' },
    {
        text: 'systemd[1]: Starting snapd.apparmor.service - Load AppArmor profiles managed internally by snapd...',
    },
    {
        text: 'systemd[1]: Finished snapd.apparmor.service - Load AppArmor profiles managed internally by snapd.',
    },
    {
        text: 'kernel: [drm] Initialized nvidia-drm 0.0.0 for 0000:0b:00.0 on minor 1',
    },
    {
        text: 'systemd[1]: Finished systemd-tmpfiles-setup.service - Create Volatile Files and Directories.',
    },
    {
        text: 'systemd[1]: Starting systemd-oomd.service - Userspace Out-Of-Memory (OOM) Killer...',
    },
    {
        text: 'systemd[1]: Starting systemd-resolved.service - Network Name Resolution...',
    },
    {
        text: 'systemd[1]: Starting systemd-timesyncd.service - Network Time Synchronization...',
    },
    {
        text: 'systemd[1]: Started systemd-oomd.service - Userspace Out-Of-Memory (OOM) Killer.',
    },
    {
        text: 'systemd[1]: Started systemd-timesyncd.service - Network Time Synchronization.',
    },
    { text: 'systemd[1]: Reached target time-set.target - System Time Set.' },
    {
        text: 'systemd[1]: Started systemd-resolved.service - Network Name Resolution.',
    },
    {
        text: 'systemd[1]: Reached target sysinit.target - System Initialization.',
        delay: 100,
    },
    { text: 'systemd[1]: Reached target basic.target - Basic System.' },
    { text: 'systemd[1]: Starting bluetooth.service - Bluetooth service...' },
    { text: 'systemd[1]: Starting dbus.service - D-Bus System Message Bus...' },
    {
        text: 'systemd[1]: Starting accounts-daemon.service - Accounts Service...',
    },
    {
        text: 'systemd[1]: Starting systemd-logind.service - User Login Management...',
    },
    { text: 'systemd[1]: Started bluetooth.service - Bluetooth service.' },
    {
        text: 'systemd[1]: Reached target bluetooth.target - Bluetooth Support.',
    },
    { text: 'systemd[1]: Started dbus.service - D-Bus System Message Bus.' },
    {
        text: 'systemd[1]: Started systemd-logind.service - User Login Management.',
    },
    {
        text: 'systemd[1]: Starting NetworkManager.service - Network Manager...',
    },
    { text: 'systemd[1]: Started accounts-daemon.service - Accounts Service.' },
    {
        text: 'NetworkManager[1437]: <info>  [1764653841.9941] NetworkManager (version 1.46.0) is starting...',
    },
    {
        text: 'NetworkManager[1437]: <info>  [1764653842.0318] hostname: static hostname changed from (none) to "arch-pc"',
    },
    { text: 'systemd[1]: Started NetworkManager.service - Network Manager.' },
    { text: 'systemd[1]: Reached target network.target - Network.' },
    {
        text: 'systemd[1]: Reached target network-online.target - Network is Online.',
    },
    {
        text: 'systemd[1]: Starting containerd.service - containerd container runtime...',
    },
    { text: 'systemd[1]: Starting cups.service - CUPS Scheduler...' },
    { text: 'systemd[1]: Started fail2ban.service - Fail2Ban Service.' },
    {
        text: 'systemd[1]: Starting libvirtd.service - libvirt legacy monolithic daemon...',
    },
    {
        text: 'containerd[1752]: time="2025-12-02T07:37:22.924603866+02:00" level=info msg="starting containerd" revision=... version=1.7.27',
    },
    {
        text: 'systemd[1]: Started containerd.service - containerd container runtime.',
    },
    {
        text: 'systemd[1]: Starting docker.service - Docker Application Container Engine...',
    },
    {
        text: 'dockerd[1880]: time="2025-12-02T07:37:23.196580543+02:00" level=info msg="Starting up"',
    },
    {
        text: 'dockerd[1880]: time="2025-12-02T07:37:23.335064723+02:00" level=info msg="[graphdriver] using prior storage driver: overlay2"',
    },
    {
        text: 'dockerd[1880]: time="2025-12-02T07:37:23.939333779+02:00" level=info msg="Loading containers: done."',
    },
    {
        text: 'dockerd[1880]: time="2025-12-02T07:37:24.292295685+02:00" level=info msg="API listen on /run/docker.sock"',
    },
    {
        text: 'systemd[1]: Started docker.service - Docker Application Container Engine.',
    },
    {
        text: 'systemd[1]: Reached target multi-user.target - Multi-User System.',
    },
    { text: 'systemd[1]: Starting gdm.service - GNOME Display Manager...' },
    { text: 'systemd[1]: Started gdm.service - GNOME Display Manager.' },
    {
        text: 'systemd[1]: Reached target graphical.target - Graphical Interface.',
        delay: 400,
    },
    { text: 'systemd[1]: Starting Terminus Login Service...' },
    {
        text: 'terminus-logind[2100]: Listening on /dev/input/event2 (Keychron Keychron K3 Pro)',
        delay: 50,
    },
    {
        text: 'terminus-logind[2100]: Listening on /dev/input/event7 (Logitech G305)',
    },
    { text: '[ OK ] Started Terminus Login Service.' },
    { text: '[INFO] PortfolioOS v1.6.14 starting up...', delay: 100 },
    { text: '[INFO] Loading user profile: visitor' },
    {
        text: '[INFO] Mounting virtual content filesystem from /src/data/content.ts',
    },
    { text: '[INFO] Content FS mounted successfully.' },
    { text: '[INFO] Initializing command interpreter...' },
    {
        text: '[INFO] Loading command modules: about, skills, projects, contact, resume',
    },
    {
        text: '[INFO] Loading command modules: theme, open, clear, fortune, cat, hello',
    },
    {
        text: '[WARN] Found potentially destructive modules: rm, format, sudo. Sandboxing enabled.',
    },
    { text: '[INFO] Command interpreter ready.', delay: 200 },
    { text: '[INFO] Initializing display server...' },
    { text: '[INFO] Detected display: 1920x1080@144Hz (G-SYNC)' },
    { text: '[INFO] Activating renderer: React DOM v19.2.0' },
    { text: '[INFO] Applying default theme...', delay: 150 },
    { text: '[INFO] Display server initialized.' },
    { text: '[INFO] Starting system services...' },
    { text: '[ OK ] Started History Service.' },
    { text: '[ OK ] Started Input Service.' },
    { text: '[ OK ] Started Theming Engine.' },
    { text: '[ OK ] Started Meltdown Prevention Daemon.' },
    { text: '[ OK ] Started ASCII Cat Renderer.' },
    { text: '[ OK ] All services started.', delay: 200 },
    { text: '[INFO] System checks complete. No errors found.' },
    { text: '[INFO] Welcome to PortfolioOS.', delay: 800 },
];
